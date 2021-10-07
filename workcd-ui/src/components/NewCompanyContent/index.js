import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import TextField from '../common/TextField';

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

const CenteredContent = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: start;
	align-items: center;
`;

const CreateCompanyHeader = styled.div`
	font-size: ${(props) => props.theme.fontSizes.large};

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const CreateCompanyButtonContainer = styled.div`
	height: 20%;
	max-height: 80px;
	width: 40%;
	max-width: 400px;
`;

function NewCompanyContent() {
	return (
		<CenteredContent>
			<NewCompanyContainer>
				<CreateCompanyHeader>Create your company</CreateCompanyHeader>
				<TextField header={'Company name'} />
				<CreateCompanyButtonContainer>
					<Button text={'Create company'} />
				</CreateCompanyButtonContainer>
			</NewCompanyContainer>
		</CenteredContent>
	);
}

export default NewCompanyContent;
