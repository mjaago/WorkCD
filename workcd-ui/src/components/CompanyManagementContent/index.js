import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { SelectedCompanyContext, Web3Context } from '../../context';
import Button from '../common/Button';
import {
	CenteredContent,
	ContentPageHeader,
	ContentPageSectionHeader,
	GenericWidescreenContainer,
} from '../common/Elements';
import TextField from '../common/TextField';
import EmployeeTable from '../EmployeeTable';

const CompanyFields = styled.div`
	height: 20vh;
	width: 100%;
	max-height: 350px;

	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

const CompanyFieldsColumn = styled.div`
	height: 20vh;
	max-height: 300px;

	display: flex;
	flex-direction: column;
	justify-content: space-between;

	width: 45%;
`;

const EmployeeSection = styled.div`
	height: 40vh;
	max-height: 550px;
	width: 100%;

	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: start;
`;

const EmployeeTableContainer = styled.div`
	height: 60%;
	width: 100%;
`;

const NewEmployeeBtnContainer = styled.div`
	width: 45%;
`;

function CompanyManagementContent() {
	const [inflow, setInflow] = useState();
	const { selectedCompany, setSelectedCompany } = useContext(
		SelectedCompanyContext,
	);
	const { account } = useContext(Web3Context);
	const history = useHistory();
	useEffect(() => {
		if (!selectedCompany || selectedCompany.owner !== account.address) {
			history.push('/');
		}
	}, [selectedCompany]);

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
