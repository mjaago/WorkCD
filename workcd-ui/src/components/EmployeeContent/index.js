import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { SelectedCompanyContext } from '../../context';
import WorkToggle from '../WorkToggle';

const CenteredFullScreen = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const InfoText = styled.div`
	text-align: center;
	font-size: ${(props) => props.theme.fontSizes.large};
`;

function EmployeeContent() {
	const { selectedCompany } = useContext(SelectedCompanyContext);
	const [isEmployee, setIsEmployee] = useState(true);

	useEffect(() => {
		//setIsEmployee(!isEmployee);
	}, [selectedCompany, isEmployee]);

	let content;

	if (!selectedCompany) {
		content = (
			<InfoText>
				Select a company to start working for and receive your funds
				immediately!
			</InfoText>
		);
	} else if (!isEmployee) {
		content = (
			<InfoText>
				{`You are not employed for the company ${selectedCompany.name}. `}
			</InfoText>
		);
	} else {
		content = <WorkToggle />;
	}
	return <CenteredFullScreen>{content}</CenteredFullScreen>;
}

export default EmployeeContent;
