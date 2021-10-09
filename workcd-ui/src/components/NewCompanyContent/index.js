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
import { ContentPageHeader, CenteredContent } from '../common/Elements';
import { NewCompanyContainer, CreateCompanyButtonContainer } from './Elements';

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
		const company = await tx.wait();
		console.log('Created company', company);
		const companies = await workCDContract.getCompanies();
		setCompaniesList(companies);
		console.log('fetched companies', companies);

		// setSelectedCompany(company.address);
		setSelectedCompany(companies.find((c) => c.name === companyName));
		setLoading(false);
		history.push('/company');
	};

	return (
		<CenteredContent>
			<NewCompanyContainer>
				<ContentPageHeader>Create your company</ContentPageHeader>
				<TextField
					header={'Company name'}
					value={companyName}
					onChange={setCompanyName}
				/>
				<CreateCompanyButtonContainer>
					<Button
						disabled={loading || !Signer.isSigner(providerOrSigner)}
						onClick={createCompany}
						text={'Create company'}
					/>
				</CreateCompanyButtonContainer>
			</NewCompanyContainer>
		</CenteredContent>
	);
}

export default NewCompanyContent;
