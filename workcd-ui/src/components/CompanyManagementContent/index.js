import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import {
	CompanyFields,
	CompanyFieldsColumn,
	EmployeeSection,
	EmployeeTableContainer,
	NewEmployeeBtnContainer,
} from './Elements';
import { SelectedCompanyContext } from '../../context';
import Button from '../common/Button';
import {
	CenteredContent,
	ContentPageHeader,
	ContentPageSectionHeader,
	GenericWidescreenContainer,
} from '../common/Elements';
import TextField from '../common/TextField';
import EmployeeTable from '../EmployeeTable';
import { useEthers } from '@usedapp/core';

function CompanyManagementContent() {
	const [inflow, setInflow] = useState();
	const { selectedCompany, setSelectedCompany } = useContext(
		SelectedCompanyContext,
	);
	const { account } = useEthers();
	const history = useHistory();
	useEffect(() => {
		console.log('account', account);
		if (!selectedCompany || selectedCompany.owner !== account) {
			history.push('/');
		}
	}, [selectedCompany, account]);

	const updateInflow = () => {
		//TODO
		console.log('Update inflow');
	};
	const addNewEmployee = () => {
		//TODO
		setSelectedCompany({ ...selectedCompany, selectedEmployee: {} });
		history.push('/employee');
	};
	return (
		<CenteredContent>
			<GenericWidescreenContainer>
				<ContentPageHeader>Company Management</ContentPageHeader>
				<CompanyFields>
					<CompanyFieldsColumn>
						<TextField
							header={'Name'}
							value={selectedCompany && selectedCompany.name}
							disabled={true}
						/>
					</CompanyFieldsColumn>
					<CompanyFieldsColumn>
						<TextField
							header={'Inflow'}
							value={inflow}
							onChange={setInflow}
						/>
						<Button text={'Update inflow'} onClick={updateInflow} />
					</CompanyFieldsColumn>
				</CompanyFields>
				<EmployeeSection>
					<ContentPageSectionHeader>
						Employees
					</ContentPageSectionHeader>
					<EmployeeTableContainer>
						<EmployeeTable />
					</EmployeeTableContainer>
					<NewEmployeeBtnContainer>
						<Button
							text={'New employee'}
							onClick={addNewEmployee}
						/>
					</NewEmployeeBtnContainer>
				</EmployeeSection>
			</GenericWidescreenContainer>
		</CenteredContent>
	);
}

export default CompanyManagementContent;
