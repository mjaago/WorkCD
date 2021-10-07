import React, { useContext } from 'react';
import styled from 'styled-components';
import { ReactComponent as ModeEditIcon } from '../../img/edit_pen.svg';
import employees from '../../testData/employees.json';
import { useHistory } from 'react-router-dom';
import { SelectedCompanyContext } from '../../context';

const FullWidthTable = styled.table`
	width: 100%;
	border: 1px solid ${(props) => props.theme.colors.main};
	border-collapse: collapse;
`;

const YScrollable = styled.div`
	overflow-y: auto;
	width: 100%;
	height: 100%;
`;

const HeaderRow = styled.thead`
	background-color: ${(props) => props.theme.colors.main};
	color: ${(props) => props.theme.colors.accent};
	height: 40px;
`;

const TableCell = styled.td`
	color: ${(props) => props.theme.colors.main};
	border: solid 1px ${(props) => props.theme.colors.main};
	text-align: center;
	height: 40px;
	border: 1px solid ${(props) => props.theme.colors.main};
`;

const TableHeader = styled.td`
	color: ${(props) => props.theme.colors.accent};
	border: solid 1px ${(props) => props.theme.colors.accent};
	text-align: center;
`;

// TODO: Make only table content scrollable, maybe add some filtering?
function EmployeeTable() {
	const history = useHistory();
	const { selectedCompany, setSelectedCompany } = useContext(
		SelectedCompanyContext,
	);
	const editEmployee = (e) => {
		setSelectedCompany({ ...selectedCompany, selectedEmployee: e });
		history.push('/employee');
	};
	return (
		<YScrollable>
			<FullWidthTable>
				<HeaderRow>
					<tr>
						<TableHeader>Name</TableHeader>
						<TableHeader>Address</TableHeader>
						<TableHeader>Salary</TableHeader>
						<TableHeader>Edit</TableHeader>
					</tr>
				</HeaderRow>
				<tbody>
					{employees.map((e, i) => (
						<tr key={i}>
							<TableCell>{e.name}</TableCell>
							<TableCell>{e.empAddress}</TableCell>
							<TableCell>{e.salaryFlowRate}</TableCell>
							<TableCell>
								<ModeEditIcon
									style={{ cursor: 'pointer' }}
									onClick={() => editEmployee(e)}
								/>
							</TableCell>
						</tr>
					))}
				</tbody>
			</FullWidthTable>
		</YScrollable>
	);
}

export default EmployeeTable;
