import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { SelectedCompanyContext } from '../../context';
import Button from '../common/Button';
import {
	CenteredContent,
	ContentPageHeader,
	GenericWidescreenContainer,
} from '../common/Elements';
import TextField from '../common/TextField';

const EmployeeFields = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	justify-content: space-between;
	max-width: 1920;
`;

const EmployeeFieldRow = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	justify-content: space-between;
	max-width: 1920;
	padding-top: 40px;
`;

const EmployeeFieldContainer = styled.div`
	width: 45%;
`;

function EmployeeManagementContent() {
	const { selectedCompany } = useContext(SelectedCompanyContext);

	if (!selectedCompany || !selectedCompany.selectedEmployee) {
		return '';
	}

	const history = useHistory();
	const [name, setName] = useState(
		selectedCompany.selectedEmployee.name || '',
	);
	const [address, setAddress] = useState(
		selectedCompany.selectedEmployee.address || '',
	);
	const [salaryFlowRate, setSalaryFlowRate] = useState(
		selectedCompany.selectedEmployee.salaryFlowRate || '',
	);
	useEffect(() => {
		if (!selectedCompany || !selectedCompany.selectedEmployee) {
			history.push('/');
		}
	}, []);

	const cancelEdit = () => {
		history.goBack();
	};

	const fireEmployee = () => {
		//TODO
		history.goBack();
	};

	const save = () => {
		//TODO
		history.goBack();
	};
	return (
		<CenteredContent>
			<GenericWidescreenContainer>
				<ContentPageHeader>Employee management</ContentPageHeader>
				<EmployeeFields>
					<EmployeeFieldRow>
						<EmployeeFieldContainer>
							<TextField
								header={'Name'}
								value={name}
								onChange={setName}
							/>
						</EmployeeFieldContainer>
						<EmployeeFieldContainer>
							<TextField
								header={'Address'}
								value={address}
								onChange={setAddress}
							/>
						</EmployeeFieldContainer>
					</EmployeeFieldRow>
					<EmployeeFieldRow>
						<EmployeeFieldContainer>
							<TextField
								header={'Salary Flow Rate'}
								value={salaryFlowRate}
								onChange={setSalaryFlowRate}
							/>
						</EmployeeFieldContainer>
						<EmployeeFieldContainer>
							<Button
								text={'Fire Employee'}
								onClick={fireEmployee}
							/>
						</EmployeeFieldContainer>
					</EmployeeFieldRow>
				</EmployeeFields>
				<EmployeeFieldRow>
					<EmployeeFieldContainer>
						<Button text={'Cancel'} onClick={cancelEdit} />
					</EmployeeFieldContainer>
					<EmployeeFieldContainer>
						<Button text={'Save'} onClick={save} />
					</EmployeeFieldContainer>
				</EmployeeFieldRow>
			</GenericWidescreenContainer>
		</CenteredContent>
	);
}

export default EmployeeManagementContent;
