import { Provider } from '@ethersproject/abstract-provider';
import React, { useContext, useState, useEffect } from 'react';
import { ProviderOrSignerContext } from '../../context';
import { trunkateAddress } from '../../util/web3Util';
import Button from '../common/Button';
import TextField from '../common/TextField';

function AccountConnector() {
	const { setProviderOrSigner, providerOrSigner } = useContext(
		ProviderOrSignerContext,
	);

	const [address, setAddress] = useState(null);

	const connectAccount = async () => {
		await providerOrSigner.send('eth_requestAccounts', []);
		const signer = providerOrSigner.getSigner();
		setAddress(await signer.getAddress());
		setProviderOrSigner(signer);
	};

	useEffect(() => {
		window.ethereum.on('accountsChanged', function () {
			connectAccount();
		});

		window.ethereum.on('networkChanged', function (networkId) {
			// TODO
		});
	}, []);

	return Provider.isProvider(providerOrSigner) || !address ? (
		<Button
			onClick={connectAccount}
			text={'Connect wallet'}
			isOnSidebar={true}
		/>
	) : (
		<TextField
			header={'Active wallet'}
			disabled={true}
			value={trunkateAddress(address)}
			isOnSidebar={true}
		/>
	);
}

export default AccountConnector;
