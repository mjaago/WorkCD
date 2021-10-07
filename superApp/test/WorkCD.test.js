const { web3tx, toWad, wad4human } = require('@decentral.ee/web3-helpers');

const deployFramework = require('@superfluid-finance/ethereum-contracts/scripts/deploy-framework');
const deployTestToken = require('@superfluid-finance/ethereum-contracts/scripts/deploy-test-token');
const deploySuperToken = require('@superfluid-finance/ethereum-contracts/scripts/deploy-super-token');
const SuperfluidSDK = require('@superfluid-finance/js-sdk');
const WorkCD = artifacts.require('WorkCD');
const CompanyContract = artifacts.require('CompanyContract');

const traveler = require('ganache-time-traveler');
const TEST_TRAVEL_TIME = 3600 * 2; // 1 hours

contract('WorkCD', (accounts) => {
	const errorHandler = (err) => {
		if (err) throw err;
	};

	const names = ['Admin', 'Alice', 'Bob', 'Carol', 'Dan', 'Emma', 'Frank'];
	accounts = accounts.slice(0, names.length);

	let sf;
	let dai;
	let daix;
	let app;
	const u = {}; // object with all users
	const aliases = {};

	before(async function () {
		//process.env.RESET_SUPERFLUID_FRAMEWORK = 1;
		await deployFramework(errorHandler, {
			web3,
			from: accounts[0],
		});
	});

	beforeEach(async function () {
		await deployTestToken(errorHandler, [':', 'fDAI'], {
			web3,
			from: accounts[0],
		});
		await deploySuperToken(errorHandler, [':', 'fDAI'], {
			web3,
			from: accounts[0],
		});

		sf = new SuperfluidSDK.Framework({
			web3,
			version: 'test',
			tokens: ['fDAI'],
		});
		await sf.initialize();
		daix = sf.tokens.fDAIx;
		dai = await sf.contracts.TestToken.at(await sf.tokens.fDAI.address);

		for (var i = 0; i < names.length; i++) {
			u[names[i].toLowerCase()] = sf.user({
				address: accounts[i],
				token: daix.address,
			});
			u[names[i].toLowerCase()].alias = names[i];
			aliases[u[names[i].toLowerCase()].address] = names[i];
		}
		for (const [, user] of Object.entries(u)) {
			if (user.alias === 'App') return;
			await web3tx(dai.mint, `${user.alias} mints many dai`)(user.address, toWad(100000000), {
				from: user.address,
			});
			await web3tx(dai.approve, `${user.alias} approves daix`)(daix.address, toWad(100000000), {
				from: user.address,
			});
		}
		//u.zero = { address: ZERO_ADDRESS, alias: "0x0" };
		console.log(u.admin.address);
		console.log(sf.host.address);
		console.log(sf.agreements.cfa.address);
		console.log(daix.address);
		app = await WorkCD.new(sf.host.address, sf.agreements.cfa.address, daix.address, u.admin.address);
		app.alias = 'APP';

		//u.app = sf.user({ address: app.address, token: daix.address });
		//u.app.alias = 'App';
		//await checkBalance(u.app);
	});

	async function checkBalance(user) {
		console.log('Balance of ', user.alias);
		console.log('DAIx: ', (await daix.balanceOf(user.address)).toString());
	}

	async function checkBalances(accounts) {
		for (let i = 0; i < accounts.length; ++i) {
			await checkBalance(accounts[i]);
		}
	}

	async function upgrade(accounts) {
		for (let i = 0; i < accounts.length; ++i) {
			await web3tx(daix.upgrade, `${accounts[i].alias} upgrades many DAIx`)(toWad(100000000), {
				from: accounts[i].address,
			});
			await checkBalance(accounts[i]);
		}
	}

	async function logUsers() {
		let string = 'user\t\ttokens\t\tnetflow\n';
		let p = 0;
		for (const [, user] of Object.entries(u)) {
			if (await hasFlows(user)) {
				p++;
				string += `${user.alias}\t\t${wad4human(await daix.balanceOf(user.address))}\t\t${wad4human(
					(await user.details()).cfa.netFlow,
				)}
            `;
			}
		}
		if (p == 0) return console.warn('no users with flows');
		console.log('User logs:');
		console.log(string);
	}

	async function getCompanies() {
		return await app.getCompanies();
	}

	async function hasFlows(user) {
		const { inFlows, outFlows } = (await user.details()).cfa.flows;
		return inFlows.length + outFlows.length > 0;
	}

	async function createCompanyContract(companyName, owner) {
		await app.createCompany(companyName, { from: owner.address });
		const company = (await getCompanies()).find((c) => c.name === companyName);
		const companyContract = await CompanyContract.at(company.compContract);
		companyContract.alias = companyName;
		return companyContract;
	}

	async function appStatus() {
		console.log('\n\n ======== APP STATUS ========');
		await checkBalance(app);
		console.log('Companies registered', await getCompanies());
		console.log('======== APP STATUS ========\n\n');
	}

	async function companyStatus(companyContract, owner) {
		console.log('\n\n ======== COMPANY STATUS ========');
		await checkBalance(companyContract);

		const employees = await companyContract.getEmployees({ from: owner });
		const inflow = await companyContract.getActiveInFlowRate({ from: owner });
		const outflow = await companyContract.getActiveOutFlowRate({ from: owner });
		console.log(`Employees for ${companyContract.alias}`, employees);
		console.log('Current active inflow', inflow.toString());
		console.log('Current active outflow', outflow.toString());
		console.log('======== COMPANY STATUS ========\n\n');
	}

	describe('Create company', async function () {
		it('Case #1 - Alice creates a company', async () => {
			// given
			const { alice } = u;
			const companyName = 'WorkCD';
			await appStatus();

			//when
			console.log(`Alice (address: ${alice.address}) is creating a company`);
			await app.createCompany(companyName, { from: alice.address });

			// then
			await appStatus();

			const companies = await getCompanies();
			assert.equal(1, companies.length);
			assert.equal(alice.address, companies[0].owner, 'Alice should be the owner of the company');
		});
	});

	describe('Update employees', async function () {
		it('Case #1 - Alice adds an employee', async () => {
			// given
			const { alice, bob } = u;
			const companyName = 'ContractorEmployer_' + Date.now();
			const companyContract = await createCompanyContract(companyName, alice);
			await companyStatus(companyContract, alice.address);

			//when
			const employeeName = 'bob';
			const flowRate = 1;
			await companyContract.upsertEmployee(employeeName, bob.address, flowRate, { from: alice.address });

			// then
			await companyStatus(companyContract, alice.address);

			const employees = await companyContract.getEmployees({ from: alice.address });
			assert.equal(1, employees.length);
			assert.equal(employeeName, employees[0].name);
			assert.equal(bob.address, employees[0].empAddress);
			assert.equal(flowRate, employees[0].salaryFlowRate);
			assert.equal(true, employees[0].isEmployed);
		});
		it("Case #2 - Alice updates employee's salary flowRate", async () => {
			// given
			const { alice, bob } = u;
			const companyName = 'ContractorEmployer_' + Date.now();
			const companyContract = await createCompanyContract(companyName, alice);
			await companyStatus(companyContract, alice.address);
			const employeeName = 'bob';
			await companyContract.upsertEmployee(employeeName, bob.address, 1, { from: alice.address });

			//when
			const updatedFlowRate = 2;
			await companyContract.upsertEmployee(employeeName, bob.address, updatedFlowRate, { from: alice.address });

			// then
			await companyStatus(companyContract, alice.address);

			const employees = await companyContract.getEmployees({ from: alice.address });
			assert.equal(1, employees.length);
			assert.equal(employeeName, employees[0].name);
			assert.equal(bob.address, employees[0].empAddress);
			assert.equal(updatedFlowRate, employees[0].salaryFlowRate);
			assert.equal(true, employees[0].isEmployed);
		});
		it('Case #3 - Alice removes an employee', async () => {
			// given
			const { alice, bob } = u;
			const companyName = 'ContractorEmployer_' + Date.now();
			const companyContract = await createCompanyContract(companyName, alice);
			await companyStatus(companyContract, alice.address);
			const employeeName = 'bob';
			const flowRate = 1;
			await companyContract.upsertEmployee(employeeName, bob.address, flowRate, { from: alice.address });

			//when
			await companyContract.removeEmployee(bob.address, { from: alice.address });

			// then
			await companyStatus(companyContract, alice.address);

			const employees = await companyContract.getEmployees({ from: alice.address });
			assert.equal(1, employees.length);
			assert.equal(employeeName, employees[0].name);
			assert.equal(bob.address, employees[0].empAddress);
			assert.equal(flowRate, employees[0].salaryFlowRate);
			assert.equal(false, employees[0].isEmployed);
		});
	});
	describe('Working', async function () {
		it('Case #1 - Bob starts working with Alice flowing enough currency to contract', async () => {
			// given
			const { alice, bob } = u;
			const companyName = 'ContractorEmployer_' + Date.now();
			const companyContract = await createCompanyContract(companyName, alice);
			await companyStatus(companyContract, alice.address);
			const employeeName = 'bob';
			const employeeFlowRate = toWad(0.000001);
			await companyContract.upsertEmployee(employeeName, bob.address, employeeFlowRate, { from: alice.address });
			const companySuperApp = sf.user({ address: companyContract.address, token: daix.address });
			await upgrade([alice]);

			//when
			await alice.flow({ recipient: companySuperApp.address, flowRate: toWad(0.0001) });
			await traveler.advanceTimeAndBlock(TEST_TRAVEL_TIME);

			await companyContract.startWorking({ from: bob.address });

			// then
			await companyStatus(companyContract, alice.address);

			const employees = await companyContract.getEmployees({ from: alice.address });
			assert.equal(1, employees.length);
			assert.equal(true, employees[0].isWorking);
		});
		it('Case #2 - Bob starts working with Alice NOT flowing enough currency to contract, should fail', async () => {
			// given
			const { alice, bob } = u;
			const companyName = 'ContractorEmployer_' + Date.now();
			const companyContract = await createCompanyContract(companyName, alice);
			await companyStatus(companyContract, alice.address);
			const employeeName = 'bob';
			const employeeFlowRate = toWad(0.000001);
			await companyContract.upsertEmployee(employeeName, bob.address, employeeFlowRate, { from: alice.address });

			//when
			try {
				await companyContract.startWorking({ from: bob.address });

				// then
				assert.fail('Should not reach here because employer is not sending enough funds to the contract');
			} catch (e) {
				assert.isOk(true);
			}

			await companyStatus(companyContract, alice.address);

			const employees = await companyContract.getEmployees({ from: alice.address });
			assert.equal(1, employees.length);
			assert.equal(false, employees[0].isWorking);
		});
		/**
		 * TODO test cases:
		 * - Employee tries to start working twice
		 * - Non employee tries to start working
		 * - Working employee's flowRate is modified
		 * - Owner modifies inflow rate while employees are working
		 */
	});
});

// Check if the owner can be a payer at the same time
