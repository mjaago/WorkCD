import React, { useContext, useEffect, useState } from 'react';
import CompanyListItem from './CompanyListItem';
import {
	CompanyListContainer,
	ListHeader,
	NameSearchBox,
	CompanyListItems,
} from './Elements';
import { Signer } from '@ethersproject/abstract-signer';
import {
	CompaniesListContext,
	ProviderOrSignerContext,
	WorkCDContractContext,
} from '../../context';

function CompanyList() {
	const [loading, setLoading] = useState(false);
	const [nameFilter, setNameFilter] = useState('');
	const workCDContract = useContext(WorkCDContractContext);
	const { providerOrSigner } = useContext(ProviderOrSignerContext);
	const { companiesList, setCompaniesList } = useContext(
		CompaniesListContext,
	);

	useEffect(() => {
		const fetchCompanies = async () => {
			setLoading(true);
			let fetchedCompanies = await workCDContract.getCompanies();
			setCompaniesList(fetchedCompanies);
			setLoading(false);
		};
		if (workCDContract) {
			fetchCompanies();
		}
	}, [workCDContract]);
	// TODO: Add loading spinner
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
				{companiesList
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
