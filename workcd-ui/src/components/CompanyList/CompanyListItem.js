import React, { useContext } from 'react';
import { ReactComponent as ModeEditIcon } from '../../img/edit_pen.svg';
import styled from 'styled-components';
import { SelectedCompanyContext, Web3Context } from '../../context';
import { useHistory } from 'react-router';

const CompanyListItemContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;

	width: 100%;
	height: 40px;
	margin: 5px 0px;
	padding: 5px;

	background: ${(props) =>
		props.isSelected
			? props.theme.colors.accent
			: props.theme.colors.background};
	border: solid 2px ${(props) => props.theme.colors.accent};
	color: ${(props) => props.theme.colors.main};
	cursor: pointer;
`;
const CompanyListItemEl = styled.div`
	display: flex;
	align-items: center;

	font-size: ${(props) => props.theme.fontSizes.small};
	height: 100%;
	width: 100%;
`;

function CompanyListItem({ company }) {
	const { compContract, name, owner } = company;

	const { selectedCompany, setSelectedCompany } = useContext(
		SelectedCompanyContext,
	);
	const { account } = useContext(Web3Context);
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
			{account.address === owner ? (
				<ModeEditIcon
					onClick={() => {
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
