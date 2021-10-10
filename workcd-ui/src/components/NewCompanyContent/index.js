import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { Signer } from '@ethersproject/abstract-signer';
import {
	CompaniesListContext,
	ProviderOrSignerContext,
	SelectedCompanyContext,
	WorkCDContractContext,
} from '../../context';
import Button from '../common/Button';
import TextField from '../common/TextField';
import {
	ContentPageHeader,
	CenteredContent,
	LoadingContainer,
	GenericWidescreenContainer,
} from '../common/Elements';
import { NewCompanyContainer, CreateCompanyButtonContainer } from './Elements';
import LoadingSpinner from '../LoadingSpinner';

function NewCompanyContent() {
	const history = useHistory();
	const { setSelectedCompany } = useContext(SelectedCompanyContext);
	const { setCompaniesList } = useContext(CompaniesListContext);
	const [companyName, setCompanyName] = useState('');
	const [loading, setLoading] = useState(false);
	const workCDContract = useContext(WorkCDContractContext);
	const { providerOrSigner } = useContext(ProviderOrSignerContext);

	const createCompany = async () => {
		// TODO: Something like that:
		setLoading(true);
		const tx = await workCDContract.createCompany(companyName);
		const receipt = await tx.wait();
		if (receipt.status === 1) {
			console.log('Created company', receipt);
			const companies = await workCDContract.getCompanies();
			setCompaniesList(companies);
			console.log('fetched companies', companies);

			// setSelectedCompany(company.address);
			setSelectedCompany(companies.find((c) => c.name === companyName));
			history.push('/company');
		}
		setLoading(false);
	};

	return (
		<CenteredContent>
			<GenericWidescreenContainer>
				<NewCompanyContainer>
					<ContentPageHeader>Create your company</ContentPageHeader>
					<TextField
						header={'Company name'}
						value={companyName}
						onChange={setCompanyName}
					/>
					<CreateCompanyButtonContainer>
						<Button
							disabled={
								loading || !Signer.isSigner(providerOrSigner)
							}
							onClick={createCompany}
							text={'Create company'}
						/>
					</CreateCompanyButtonContainer>
				</NewCompanyContainer>
				<LoadingContainer loading={loading}>
					<LoadingSpinner />
				</LoadingContainer>
			</GenericWidescreenContainer>
		</CenteredContent>
	);
}

export default NewCompanyContent;
