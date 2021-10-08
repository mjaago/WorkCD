import React, { useState } from 'react';
import { WorkCDContractContext } from '../context';
import { Contract, utils } from 'ethers';
import workCDAbi from '../contract-abi/WorkCD.json';

function withWorkCDContract(WrappedComponent) {
	return function ConnectionWrapper(props) {
		const [workCD, setWorkCD] = useState(null);
		useState(() => {
			if (workCD) {
				return;
			}
			const workcdInterface = new utils.Interface(workCDAbi);
			const contract = new Contract(
				process.env.ROPSTEN_WORKCD_CONTRACT,
				workcdInterface,
			);

			setWorkCD(contract);
		}, [workCD]);

		return (
			<WorkCDContractContext.Provider value={workCD}>
				workCD ? (<WrappedComponent {...props} />) : (<div>LOADING</div>
				);
			</WorkCDContractContext.Provider>
		);
	};
}

export default withWorkCDContract;
