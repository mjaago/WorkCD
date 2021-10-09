import React, { useEffect, useState } from 'react';
import { ProviderOrSignerContext, WorkCDContractContext } from '../context';
import { Contract, utils } from 'ethers';
import workCDAbi from '../contract-abi/WorkCD.json';
import { ethers } from 'ethers';

function withWeb3Context(WrappedComponent) {
	return function ConnectionWrapper(props) {
		const [workCD, setWorkCD] = useState(null);
		const [providerOrSigner, setProviderOrSigner] = useState(null);

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

		return (
			<ProviderOrSignerContext.Provider
				value={{ providerOrSigner, setProviderOrSigner }}
			>
				<WorkCDContractContext.Provider value={workCD}>
					{workCD ? (
						<WrappedComponent {...props} />
					) : (
						<div>LOADING</div>
					)}
				</WorkCDContractContext.Provider>
			</ProviderOrSignerContext.Provider>
		);
	};
}

export default withWeb3Context;
