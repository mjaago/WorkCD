import React, { useContext, useEffect, useState } from 'react';
import { InfoText, CenteredFullScreen } from './Elements';
import { SelectedCompanyContext } from '../../context';
import WorkToggle from '../WorkToggle';

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
