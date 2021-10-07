import styled from 'styled-components';

const ContentPageHeader = styled.div`
	font-size: ${(props) => props.theme.fontSizes.large};
	color: ${(props) => props.theme.colors.main};

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 20px 0px;
`;

const ContentPageSectionHeader = styled.div`
	font-size: ${(props) => props.theme.fontSizes.largeMedium};
	color: ${(props) => props.theme.colors.main};

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const CenteredContent = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: start;
	align-items: center;
`;

const GenericWidescreenContainer = styled.div`
	height: 100vh;
	max-height: 1080px;
	width: 100%;
	max-width: 1920px;

	padding: 60px;

	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: flex-start;
`;

export {
	ContentPageHeader,
	ContentPageSectionHeader,
	CenteredContent,
	GenericWidescreenContainer,
};
