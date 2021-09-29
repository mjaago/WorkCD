const { getSuperfluid } = require('../config/ethConfig');

async function startFlow(toAddress) {
	const workCDWallet = (await getSuperfluid()).user({
		address: process.env.WORKCD_WALLET_ADDR,
		token: process.env.TOKEN_ADDR,
	});

	await workCDWallet.flow({
		recipient: toAddress,
		flowRate: '1',
	});

	setTimeout(() => {
		stopFlow(toAddress);
	}, 10000);
}

async function stopFlow(toAddress) {
	const workCDWallet = (await getSuperfluid()).user({
		address: process.env.WORKCD_WALLET_ADDR,
		token: process.env.TOKEN_ADDR,
	});
	await workCDWallet.flow({
		recipient: toAddress,
		flowRate: '0',
	});
}

module.exports = { startFlow };
