import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import {
	EmployeeFieldContainer,
	EmployeeFields,
	EmployeeFieldRow,
} from './Elements';
import { ProviderOrSignerContext, SelectedCompanyContext } from '../../context';
import Button from '../common/Button';
import {
	CenteredContent,
	ContentPageHeader,
	GenericWidescreenContainer,
} from '../common/Elements';
import TextField from '../common/TextField';
import _ from 'lodash';
import { getCompanyContract } from '../../util/web3Util';

function EmployeeManagementContent() {
	const { selectedCompany, setSelectedCompany } = useContext(
		SelectedCompanyContext,
	);
	const { providerOrSigner } = useContext(ProviderOrSignerContext);
	const [loading, setLoading] = useState(false);

	const history = useHistory();
	const [name, setName] = useState(
		_.get(selectedCompany, ['selectedEmployee', 'name'], ''),
	);
	const [address, setAddress] = useState(
		_.get(selectedCompany, ['selectedEmployee', 'empAddress'], ''),
	);
	const [salaryFlowRate, setSalaryFlowRate] = useState(
		_.get(selectedCompany, ['selectedEmployee', 'salaryFlowRate'], ''),
	);

	useEffect(() => {
		if (!selectedCompany || !selectedCompany.selectedEmployee) {
			history.push('/');
		}
	}, [selectedCompany, history]);

	useEffect(() => {
		return () => {
			setSelectedCompany({ ...selectedCompany, selectedEmployee: null });
		};
	}, [selectedCompany, setSelectedCompany]);

	const cancelEdit = () => {
		history.goBack();
	};

	const fireEmployee = async () => {
		setLoading(true);
		const companyContract = await getCompanyContract(
			providerOrSigner,
			selectedCompany,
		);
		const tx = await companyContract.removeEmployee(address);
		const receipt = await tx.wait();
		if (receipt.status === 1) {
			history.goBack();
		}
		setLoading(false);

		history.goBack();
	};

	const save = async () => {
		setLoading(true);
		console.log('Saving employee');
		const companyContract = await getCompanyContract(
			providerOrSigner,
			selectedCompany,
		);
		const tx = await companyContract.upsertEmployee(
			name,
			address,
			parseFloat(salaryFlowRate),
		);
		console.log('Employee save finished');

		const receipt = await tx.wait();
		if (receipt.status === 1) {
			console.log('Employee saved successfully');
			history.goBack();
		}
		setLoading(false);
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
								disabled={loading}
							/>
						</EmployeeFieldContainer>
						<EmployeeFieldContainer>
							<TextField
								header={'Address'}
								value={address}
								onChange={setAddress}
								disabled={
									loading ||
									!_.get(
										selectedCompany,
										['selectedEmployee', 'isNew'],
										false,
									)
								}
							/>
						</EmployeeFieldContainer>
					</EmployeeFieldRow>
					<EmployeeFieldRow>
						<EmployeeFieldContainer>
							<TextField
								header={'Salary Flow Rate'}
								value={salaryFlowRate}
								onChange={setSalaryFlowRate}
								disabled={loading}
							/>
						</EmployeeFieldContainer>
						<EmployeeFieldContainer>
							<Button
								text={'Fire Employee'}
								onClick={fireEmployee}
								disabled={
									loading ||
									_.get(
										selectedCompany,
										['selectedEmployee', 'isNew'],
										false,
									)
								}
							/>
						</EmployeeFieldContainer>
					</EmployeeFieldRow>
				</EmployeeFields>
				<EmployeeFieldRow>
					<EmployeeFieldContainer>
						<Button
							text={'Cancel'}
							onClick={cancelEdit}
							disabled={loading}
						/>
					</EmployeeFieldContainer>
					<EmployeeFieldContainer>
						<Button
							text={'Save'}
							onClick={save}
							disabled={loading}
						/>
					</EmployeeFieldContainer>
				</EmployeeFieldRow>
			</GenericWidescreenContainer>
		</CenteredContent>
	);
}

export default EmployeeManagementContent;
