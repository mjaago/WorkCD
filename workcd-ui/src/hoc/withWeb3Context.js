import React, { useEffect, useState } from 'react';
import {
	ProviderOrSignerContext,
	WorkCDContractContext,
	SuperfluidContext,
} from '../context';
import { Contract, utils, ethers } from 'ethers';
import { Signer } from '@ethersproject/abstract-signer';
import workCDAbi from '../contract-abi/WorkCD.json';
const SuperfluidSDK = require('@superfluid-finance/js-sdk');
const { Web3Provider } = require('@ethersproject/providers');

function withWeb3Context(WrappedComponent) {
	return function ConnectionWrapper(props) {
		const [workCD, setWorkCD] = useState(null);
		const [providerOrSigner, setProviderOrSigner] = useState(null);
		const [superfluid, setSuperfluid] = useState(null);

		useEffect(() => {
			const initContract = async () => {
				const workcdInterface = new utils.Interface(workCDAbi);
				const contract = new Contract(
					process.env.REACT_APP_ROPSTEN_WORKCD_CONTRACT,
					workcdInterface,
					providerOrSigner,
				);
				setWorkCD(contract);
			};
			if (providerOrSigner) {
				initContract();
			}
		}, [providerOrSigner]);

		useEffect(() => {
			const initProvider = async () => {
				const provider = new ethers.providers.Web3Provider(
					window.ethereum,
					'ropsten',
				);
				setProviderOrSigner(provider);
			};

			initProvider();
		}, []);

		useEffect(() => {
			const initSuperfluid = async () => {
				const sf = new SuperfluidSDK.Framework({
					ethers: new Web3Provider(window.ethereum),
				});
				await sf.initialize();
				setSuperfluid(sf);
			};
			if (providerOrSigner && Signer.isSigner(providerOrSigner)) {
				initSuperfluid();
			}
		}, [providerOrSigner]);

		return (
			<ProviderOrSignerContext.Provider
				value={{ providerOrSigner, setProviderOrSigner }}
			>
				<WorkCDContractContext.Provider value={workCD}>
					<SuperfluidContext.Provider value={superfluid}>
						{workCD ? (
							<WrappedComponent {...props} />
						) : (
							<div>LOADING</div>
						)}
					</SuperfluidContext.Provider>
				</WorkCDContractContext.Provider>
			</ProviderOrSignerContext.Provider>
		);
	};
}

export default withWeb3Context;
