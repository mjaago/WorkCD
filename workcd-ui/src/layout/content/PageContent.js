import React from 'react';
import { Route, Switch } from 'react-router-dom';
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
			<Switch>
				<Route path="/employee" component={EmployeeManagementContent} />
				<Route path="/company" component={CompanyManagementContent} />
				<Route path="/new" component={NewCompanyContent} />
				<Route exact path="/" component={EmployeeContent} />
			</Switch>
		</Content>
	);
}

export default PageContent;
