import styled from 'styled-components';
const NewCompanyContainer = styled.div`
	height: 80vh;
	max-height: 800px;
	width: 100%;
	max-width: 1920px;

	padding: 100px;

	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
`;

const CreateCompanyButtonContainer = styled.div`
	height: 20%;
	max-height: 80px;
	width: 40%;
	max-width: 400px;
`;
export { CreateCompanyButtonContainer, NewCompanyContainer };
