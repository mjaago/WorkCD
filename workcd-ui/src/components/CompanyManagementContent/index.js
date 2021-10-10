import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import {
	CompanyFields,
	CompanyFieldsColumn,
	EmployeeSection,
	EmployeeTableContainer,
	NewEmployeeBtnContainer,
} from './Elements';
import {
	ProviderOrSignerContext,
	SelectedCompanyContext,
	SuperfluidContext,
} from '../../context';
import Button from '../common/Button';
import {
	CenteredContent,
	ContentPageHeader,
	ContentPageSectionHeader,
	GenericWidescreenContainer,
	LoadingContainer,
} from '../common/Elements';
import TextField from '../common/TextField';
import EmployeeTable from '../EmployeeTable';
import { getCompanyContract, isCompanyOwner } from '../../util/web3Util';
import { Signer } from '@ethersproject/abstract-signer';
import LoadingSpinner from '../LoadingSpinner';

function CompanyManagementContent() {
	const [inflow, setInflow] = useState();
	const [companyContract, setCompanyContract] = useState();
	const [loading, setLoading] = useState(false);
	const { selectedCompany, setSelectedCompany } = useContext(
		SelectedCompanyContext,
	);
	const { providerOrSigner } = useContext(ProviderOrSignerContext);
	const superfluid = useContext(SuperfluidContext);
	const history = useHistory();

	useEffect(() => {
		const checkOwner = async () => {
			if (!(await isCompanyOwner(providerOrSigner, selectedCompany))) {
				history.push('/');
			}
		};
		checkOwner();
	}, [selectedCompany, history, providerOrSigner]);

	useEffect(() => {
		const initCompanyContract = async () => {
			if (!(await isCompanyOwner(providerOrSigner, selectedCompany))) {
				return;
			}
			setCompanyContract(
				await getCompanyContract(providerOrSigner, selectedCompany),
			);
		};
		if (selectedCompany) {
			initCompanyContract();
		}
	}, [selectedCompany, providerOrSigner]);

	useEffect(() => {
		const initInflow = async () => {
			if (!(await isCompanyOwner(providerOrSigner, selectedCompany))) {
				return;
			}
			const inflow = await companyContract.getActiveInFlowRate();
			setInflow(inflow);
		};
		if (selectedCompany && companyContract) {
			initInflow();
		}
	}, [selectedCompany, providerOrSigner, companyContract]);

	const updateInflow = async () => {
		if (
			Signer.isSigner(providerOrSigner) &&
			companyContract &&
			superfluid &&
			(await isCompanyOwner(providerOrSigner, selectedCompany))
		) {
			setLoading(true);
			const walletAddress = await providerOrSigner.getAddress();
			const user = superfluid.user({
				address: walletAddress,
				token: process.env.REACT_APP_ROPSTEN_fDAIx,
			});
			await user.flow({
				recipient: companyContract.address,
				flowRate: inflow,
			});
			console.log('Update inflow');
			setLoading(false);
		}
	};
	const addNewEmployee = () => {
		setSelectedCompany({
			...selectedCompany,
			selectedEmployee: { isNew: true },
		});
		history.push('/employee');
	};
	return (
		<CenteredContent>
			<GenericWidescreenContainer>
				<ContentPageHeader>Company Management</ContentPageHeader>
				<CompanyFields>
					<CompanyFieldsColumn>
						<TextField
							header={'Name'}
							value={selectedCompany && selectedCompany.name}
							disabled={true}
						/>
					</CompanyFieldsColumn>
					<CompanyFieldsColumn>
						<TextField
							header={'Inflow'}
							value={inflow}
							onChange={setInflow}
							disabled={loading}
						/>
						<Button
							text={'Update inflow'}
							onClick={updateInflow}
							disabled={loading}
						/>
					</CompanyFieldsColumn>
				</CompanyFields>
				<EmployeeSection>
					<ContentPageSectionHeader>
						Employees
					</ContentPageSectionHeader>
					<EmployeeTableContainer>
						<EmployeeTable companyContract={companyContract} />
					</EmployeeTableContainer>
					<NewEmployeeBtnContainer>
						<Button
							text={'New employee'}
							onClick={addNewEmployee}
							disabled={loading}
						/>
					</NewEmployeeBtnContainer>
				</EmployeeSection>
				<LoadingContainer loading={loading}>
					<LoadingSpinner />
				</LoadingContainer>
			</GenericWidescreenContainer>
		</CenteredContent>
	);
}

export default CompanyManagementContent;
