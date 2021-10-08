import styled from 'styled-components';

const CompanyListContainer = styled.div`
	width: 100%;
	height: 40vh;
`;
const ListHeader = styled.div`
	color: ${(props) => props.theme.colors.accent};
`;
const CompanyListItems = styled.div`
	overflow-y: auto;
	margin: 20px 0px;
	max-height: 100%;
`;

const NameSearchBox = styled.input`
	width: 100%;
	height: 40px;
	outline: none;
`;

const CompanyListItemContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;

	width: 100%;
	height: 40px;
	margin: 5px 0px;
	padding: 5px;

	background: ${(props) =>
		props.isSelected
			? props.theme.colors.accent
			: props.theme.colors.background};
	border: solid 2px ${(props) => props.theme.colors.accent};
	color: ${(props) => props.theme.colors.main};
	cursor: pointer;
`;
const CompanyListItemEl = styled.div`
	display: flex;
	align-items: center;

	font-size: ${(props) => props.theme.fontSizes.small};
	height: 100%;
	width: 100%;
`;

export {
	CompanyListContainer,
	CompanyListItemEl,
	CompanyListItemContainer,
	NameSearchBox,
	ListHeader,
	CompanyListItems,
};
