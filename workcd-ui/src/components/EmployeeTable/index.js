import React, { useContext } from 'react';
import { ReactComponent as ModeEditIcon } from '../../img/edit_pen.svg';
import employees from '../../testData/employees.json';
import { useHistory } from 'react-router-dom';
import { SelectedCompanyContext } from '../../context';
import {
	YScrollable,
	FullWidthTable,
	HeaderRow,
	TableHeader,
	TableCell,
} from './Elements';

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
