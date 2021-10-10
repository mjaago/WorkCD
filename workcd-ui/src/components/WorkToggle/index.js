import React, { useContext, useEffect, useState } from 'react';
import { ProviderOrSignerContext, SelectedCompanyContext } from '../../context';
import { getCompanyContract } from '../../util/web3Util';
import LoadingSpinner from '../LoadingSpinner';
import {
	ToggleContainer,
	ToggleBox,
	StopIcon,
	PlayIcon,
	ToggleInfo,
} from './Elements';

function WorkToggle() {
	const [isWorking, setIsWorking] = useState(false);
	const [isEmployed, setIsEmployed] = useState(false);
	const [loading, setLoading] = useState(false);
	const { selectedCompany } = useContext(SelectedCompanyContext);
	const { providerOrSigner } = useContext(ProviderOrSignerContext);

	async function checkEmployeeStatus() {
		setLoading(true);
		const companyContract = await getCompanyContract(
			providerOrSigner,
			selectedCompany,
		);
		if (companyContract) {
			setIsEmployed(await companyContract.isEmployee());
			try {
				setIsWorking(await companyContract.isWorkingNow());
			} catch (e) {
				console.log(e);
			}
		}
		setLoading(false);
	}

	useEffect(() => {
		const initStatus = async () => {
			await checkEmployeeStatus();
		};
		if (selectedCompany && providerOrSigner) {
			initStatus();
		}
	}, [providerOrSigner, selectedCompany]);

	const toggleWork = async () => {
		setLoading(true);
		const companyContract = await getCompanyContract(
			providerOrSigner,
			selectedCompany,
		);
		if (companyContract) {
			let tx;
			if (isWorking) {
				tx = await companyContract.stopWorking();
			} else {
				tx = await companyContract.startWorking();
			}
			const receipt = await tx.wait();
			if (receipt.status === 1) {
				await checkEmployeeStatus();
			}
		}
		setLoading(false);
	};

	return (
		<ToggleContainer>
			{loading ? (
				<LoadingSpinner />
			) : (
				<>
					{isEmployed ? (
						<>
							<ToggleBox onClick={toggleWork}>
								{isWorking ? <StopIcon /> : <PlayIcon />}
							</ToggleBox>
							<ToggleInfo>
								{isWorking
									? `STOP WORKING FOR ${selectedCompany.name}`
									: `START WORKING FOR ${selectedCompany.name}`}
							</ToggleInfo>
						</>
					) : (
						<ToggleInfo>YOU ARE NOT EMPLOYEED</ToggleInfo>
					)}
				</>
			)}
		</ToggleContainer>
	);
}

export default WorkToggle;
