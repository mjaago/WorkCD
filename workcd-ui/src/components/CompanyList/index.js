import React, { useEffect, useState } from 'react';
import CompanyListItem from './CompanyListItem';
import testCompanies from '../../testData/companies.json';
import {
	CompanyListContainer,
	ListHeader,
	NameSearchBox,
	CompanyListItems,
} from './Elements';

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
