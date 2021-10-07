import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CompanyListItem from './CompanyListItem';
import testCompanies from '../../testData/companies.json';

const CompanyListContainer = styled.div`
	width: 100%;
	height: 40vh;
`;
const ListHeader = styled.div`
	color: ${(props) => props.theme.colors.accent};
`;
const CompanyListItems = styled.div`
	overflow-y: auto;
	margin: 20px 0px;
	max-height: 100%;
`;

const NameSearchBox = styled.input`
	width: 100%;
	height: 40px;
	outline: none;
`;

function CompanyList() {
	const [companies, setCompanies] = useState([]);
	const [loading, setLoading] = useState(false);
	const [nameFilter, setNameFilter] = useState('');

	useEffect(() => {
		setLoading(true);
		console.log('Loading', loading);
		setTimeout(() => {
			setLoading(false);
			setCompanies(testCompanies);
		}, 2000);
	}, []);
	// TODO: Add loading spinner
	console.log(nameFilter);
	return (
		<CompanyListContainer>
			<ListHeader>Listed companies</ListHeader>
			<NameSearchBox
				type="search"
				value={nameFilter}
				onChange={(e) => setNameFilter(e.target.value)}
				placeholder="Search for company"
			/>
			<CompanyListItems>
				{companies
					.filter((c) =>
						c.name.toLowerCase().includes(nameFilter.toLowerCase()),
					)
					.map((c, i) => (
						<CompanyListItem key={i} company={c} />
					))}
			</CompanyListItems>
		</CompanyListContainer>
	);
}

export default CompanyList;
