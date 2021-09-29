const Web3 = require('web3');
const SuperfluidSDK = require('@superfluid-finance/js-sdk');
const HDWalletProvider = require('@truffle/hdwallet-provider');

let wallet;
let web3;
let sf;

function getWeb3() {
	if (web3) {
		return web3;
	}
	const provider = new HDWalletProvider({
		privateKeys: [process.env.PRIVATE_KEY],
		providerOrUrl: process.env.RPC_URL,
	});
	web3 = new Web3(provider);
	return web3;
}

function setUpWallet() {
	if (wallet) {
		return;
	}
	const acc = getWeb3().eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);
	wallet = getWeb3().eth.accounts.wallet.add(acc);

	console.log('finished wallet setup', getWeb3().eth.accounts.wallet[process.env.WORKCD_WALLET_ADDR]);
}

async function getSuperfluid() {
	if (sf) {
		return sf;
	}
	sf = new SuperfluidSDK.Framework({
		web3: getWeb3(),
	});
	await sf.initialize();
	return sf;
}

module.exports = { getWeb3, setUpWallet, getSuperfluid };
