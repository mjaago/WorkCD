import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { SelectedCompanyContext, WorkCDContractContext } from '../../context';
import Button from '../common/Button';
import TextField from '../common/TextField';
import { ContentPageHeader, CenteredContent } from '../common/Elements';
import { NewCompanyContainer, CreateCompanyButtonContainer } from './Elements';
import testCompanies from '../../testData/companies.json';
import { useContractFunction } from '@usedapp/core';

function NewCompanyContent() {
	const history = useHistory();
	const { setSelectedCompany } = useContext(SelectedCompanyContext);
	const [companyName, setCompanyName] = useState('');
	const workCDContract = useContext(WorkCDContractContext);
	const { state, send } = useContractFunction(workCDContract, 'deposit', {
		transactionName: 'Wrap',
	});

	const createCompany = () => {
		// TODO: Something like that:
		// const company = await createCompany();
		// setSelectedCompany(company.address);
		setSelectedCompany(testCompanies[0]);
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
					<Button onClick={createCompany} text={'Create company'} />
				</CreateCompanyButtonContainer>
			</NewCompanyContainer>
		</CenteredContent>
	);
}

export default NewCompanyContent;
