const WorkCD = artifacts.require('WorkCD');
require('dotenv').config();

module.exports = function (deployer, network, accounts) {
	deployer.deploy(
		WorkCD,
		process.env.ROPSTEN_SUPERFLUID_HOST,
		process.env.ROPSTEN_SUPERFLUID_CFA,
		process.env.ROPSTEN_SUPERFLUID_fDAIx,
		accounts[0],
	);
};
