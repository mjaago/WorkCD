import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { SelectedCompanyContext } from '../context';
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
	return (
		<ThemeProvider theme={theme}>
			<FullScreen>
				<SelectedCompanyContext.Provider
					value={{ selectedCompany, setSelectedCompany }}
				>
					<SidebarLayout />
					<PageContent />
				</SelectedCompanyContext.Provider>
			</FullScreen>
		</ThemeProvider>
	);
}

export default withWeb3Context(Layout);
