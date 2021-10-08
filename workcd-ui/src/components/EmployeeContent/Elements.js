import styled from 'styled-components';

const CenteredFullScreen = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const InfoText = styled.div`
	text-align: center;
	font-size: ${(props) => props.theme.fontSizes.large};
`;

export { InfoText, CenteredFullScreen };
