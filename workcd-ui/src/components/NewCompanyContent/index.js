import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { SelectedCompanyContext } from '../../context';
import Button from '../common/Button';
import TextField from '../common/TextField';
import { ContentPageHeader, CenteredContent } from '../common/Elements';
import testCompanies from '../../testData/companies.json';

const NewCompanyContainer = styled.div`
	height: 80vh;
	max-height: 800px;
	width: 100%;
	max-width: 1920px;

	padding: 100px;

	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
`;

const CreateCompanyButtonContainer = styled.div`
	height: 20%;
	max-height: 80px;
	width: 40%;
	max-width: 400px;
`;

function NewCompanyContent() {
	const history = useHistory();
	const { setSelectedCompany } = useContext(SelectedCompanyContext);
	const [companyName, setCompanyName] = useState('');

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
