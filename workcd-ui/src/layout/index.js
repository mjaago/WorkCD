import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { CompaniesListContext, SelectedCompanyContext } from '../context';
import withWeb3Context from '../hoc/withWeb3Context';
import PageContent from './content/PageContent';
import SidebarLayout from './sidebar/SidebarLayout';

const theme = {
	colors: {
		background: '#FFFFFF',
		main: '#2D4059',
		accent: '#FFD460',
	},
	fonts: ['Montserrat'],
	fontSizes: {
		small: '1rem',
		medium: '1.5rem',
		largeMedium: '2rem',
		large: '2.5rem',
	},
};

const FullScreen = styled.div`
	display: flex;
	width: 100vw;
	height: 100vh;
`;

function Layout() {
	const [selectedCompany, setSelectedCompany] = useState(null);
	const [companiesList, setCompaniesList] = useState([]);
	return (
		<ThemeProvider theme={theme}>
			<FullScreen>
				<CompaniesListContext.Provider
					value={{ companiesList, setCompaniesList }}
				>
					<SelectedCompanyContext.Provider
						value={{ selectedCompany, setSelectedCompany }}
					>
						<SidebarLayout />
						<PageContent />
					</SelectedCompanyContext.Provider>
				</CompaniesListContext.Provider>
			</FullScreen>
		</ThemeProvider>
	);
}

export default withWeb3Context(Layout);
