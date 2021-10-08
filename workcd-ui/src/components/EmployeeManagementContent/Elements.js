import styled from 'styled-components';
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

export { EmployeeFieldContainer, EmployeeFields, EmployeeFieldRow };
