import { useEthers } from '@usedapp/core';
import React from 'react';
import { trunkateAddress } from '../../util/web3Util';
import Button from '../common/Button';
import TextField from '../common/TextField';

function AccountConnector() {
	const { account, activateBrowserWallet } = useEthers();
	return account ? (
		<TextField
			header={'Active wallet'}
			disabled={true}
			value={trunkateAddress(account)}
			onSidebar={true}
		/>
	) : (
		<Button
			onClick={activateBrowserWallet}
			text={'Connect wallet'}
			onSidebar={true}
		/>
	);
}

export default AccountConnector;
