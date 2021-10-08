import React from 'react';
import CompanyList from '../../components/CompanyList';
import NewCompanyButton from '../../components/NewCompanyButton';
import styled from 'styled-components';
import AccountConnector from '../../components/AccountConnector';

const Sidebar = styled.div`
	height: 100vh;
	width: 20%;
	max-width: 450px;
	min-width: 300px;
`;

const SidebarContent = styled.div`
	height: 100%;
	padding: 40px;
	background-color: ${(props) => props.theme.colors.main};
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
`;
const Logo = styled.div`
	color: ${(props) => props.theme.colors.accent};
	font-size: ${(props) => props.theme.fontSizes.large};
`;

function SidebarLayout() {
	return (
		<Sidebar>
			<SidebarContent>
				<Logo>WORKCD</Logo>
				<AccountConnector />
				<CompanyList />
				<NewCompanyButton />
			</SidebarContent>
		</Sidebar>
	);
}

export default SidebarLayout;
