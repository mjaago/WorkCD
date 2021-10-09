import React, { useContext, useState, useEffect } from 'react';
import { ReactComponent as ModeEditIcon } from '../../img/edit_pen.svg';
import { ProviderOrSignerContext, SelectedCompanyContext } from '../../context';
import { useHistory } from 'react-router';
import { Signer } from '@ethersproject/abstract-signer';
import { CompanyListItemContainer, CompanyListItemEl } from './Elements';

function CompanyListItem({ company }) {
	const { compContract, name, owner } = company;
	const [isOwner, setIsOwner] = useState(false);
	const { providerOrSigner } = useContext(ProviderOrSignerContext);

	const { selectedCompany, setSelectedCompany } = useContext(
		SelectedCompanyContext,
	);

	const history = useHistory();
	useEffect(() => {
		const checkOwnerStatus = async () => {
			if (Signer.isSigner(providerOrSigner)) {
				const signerAddress = await providerOrSigner.getAddress();
				setIsOwner(signerAddress === owner);
			}
		};
		checkOwnerStatus();
	}, [company]);

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
			{isOwner ? (
				<ModeEditIcon
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
