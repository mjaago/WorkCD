import styled from 'styled-components';
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

export { FullWidthTable, YScrollable, HeaderRow, TableCell, TableHeader };
