import styled from 'styled-components';

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

export {
	CompanyFields,
	CompanyFieldsColumn,
	EmployeeSection,
	EmployeeTableContainer,
	NewEmployeeBtnContainer,
};
