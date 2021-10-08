import React, { useContext } from 'react';
import { ReactComponent as ModeEditIcon } from '../../img/edit_pen.svg';
import { SelectedCompanyContext } from '../../context';
import { useEthers } from '@usedapp/core';
import { useHistory } from 'react-router';
import { CompanyListItemContainer, CompanyListItemEl } from './Elements';

function CompanyListItem({ company }) {
	const { compContract, name, owner } = company;

	const { selectedCompany, setSelectedCompany } = useContext(
		SelectedCompanyContext,
	);
	const { account } = useEthers();

	const history = useHistory();

	const editCompany = () => {
		//TODO:
		console.log('Edit company', name);
		setSelectedCompany(company);
		history.push('/company');
	};

	const selectCompany = () => {
		//TODO:
		console.log('Select company', name);
		setSelectedCompany(company);
		history.push('/');
	};
	// TODO: Add loading spinner
	return (
		<CompanyListItemContainer
			isSelected={
				selectedCompany && selectedCompany.compContract === compContract
			}
			onClick={() => {
				selectCompany(company);
			}}
		>
			<CompanyListItemEl>{name}</CompanyListItemEl>
			{account === owner ? (
				<ModeEditIcon
					style={{ zScore: 100 }}
					onClick={(e) => {
						e.stopPropagation();
						editCompany();
					}}
				/>
			) : (
				''
			)}
		</CompanyListItemContainer>
	);
}

export default CompanyListItem;
