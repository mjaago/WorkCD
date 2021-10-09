import React, { useEffect, useContext, useState } from 'react';
import { ReactComponent as ModeEditIcon } from '../../img/edit_pen.svg';
import { useHistory } from 'react-router-dom';
import { ProviderOrSignerContext, SelectedCompanyContext } from '../../context';
import {
	YScrollable,
	FullWidthTable,
	HeaderRow,
	TableHeader,
	TableCell,
} from './Elements';
import { isCompanyOwner } from '../../util/web3Util';

// TODO: Make only table content scrollable, maybe add some filtering?
function EmployeeTable({ companyContract }) {
	const history = useHistory();
	const [employees, setEmployees] = useState([]);
	const { selectedCompany, setSelectedCompany } = useContext(
		SelectedCompanyContext,
	);
	const { providerOrSigner } = useContext(ProviderOrSignerContext);
	const editEmployee = (e) => {
		setSelectedCompany({ ...selectedCompany, selectedEmployee: e });
		history.push('/employee');
	};

	useEffect(() => {
		const fetchEmployees = async () => {
			if (!(await isCompanyOwner(providerOrSigner, selectedCompany))) {
				return;
			}
			let employees = await companyContract.getEmployees();
			employees = employees.map(
				({
					name,
					empAddress,
					isEmployed,
					isWorking,
					salaryFlowRate,
				}) => ({
					name,
					empAddress,
					isEmployed,
					isWorking,
					salaryFlowRate: salaryFlowRate.toString(),
				}),
			);
			setEmployees(employees);
		};
		if (companyContract) {
			fetchEmployees();
		}
	}, [providerOrSigner, companyContract, selectedCompany]);

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
