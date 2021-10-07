import React from 'react';
import { Route } from 'react-router-dom';
import CompanyManagementContent from '../../components/CompanyManagementContent';
import EmployeeContent from '../../components/EmployeeContent';
import NewCompanyContent from '../../components/NewCompanyContent';
import styled from 'styled-components';
import EmployeeManagementContent from '../../components/EmployeeManagementContent';

const Content = styled.div`
	width: 100%;
	height: 100%;
`;

function PageContent() {
	return (
		<Content>
			<Route path="/employee" component={EmployeeManagementContent} />
			<Route path="/company" component={CompanyManagementContent} />
			<Route path="/new" component={NewCompanyContent} />
			<Route path="/" component={EmployeeContent} />
		</Content>
	);
}

export default PageContent;
