import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { SelectedCompanyContext } from '../../context';
import { ContentPageHeader } from '../common/Elements';

const ToggleContainer = styled.div`
	display: flex;
	width: 100%;
	justify-content: center;
	align-items: center;
	flex-direction: row;
`;

const ToggleBox = styled.div`
	width: 200px;
	height: 200px;
	border: solid 4px ${(props) => props.theme.colors.accent};
	background-color: ${(props) => props.theme.colors.main};
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
`;

const PlayIcon = styled.div`
	width: 0;
	height: 0;
	border-left: 75px solid ${(props) => props.theme.colors.accent};
	border-top: 50px solid transparent;

	border-bottom: 50px solid transparent;
`;

const StopIcon = styled.div`
	width: 75px;
	height: 75px;
	background-color: ${(props) => props.theme.colors.accent};
`;

const ToggleInfo = styled.div`
	font-size: ${(props) => props.theme.fontSizes.large};
	color: ${(props) => props.theme.colors.main};
	padding-left: 100px;
`;

function WorkToggle() {
	const [isWorking, setIsWorking] = useState(false);
	const { selectedCompany } = useContext(SelectedCompanyContext);

	const toggleWork = () => {
		setIsWorking(!isWorking);
	};

	return (
		<ToggleContainer>
			<ToggleBox onClick={toggleWork}>
				{isWorking ? <StopIcon /> : <PlayIcon />}
			</ToggleBox>
			<ToggleInfo>
				{isWorking
					? `STOP WORKING FOR ${selectedCompany.name}`
					: `START WORKING FOR ${selectedCompany.name}`}
			</ToggleInfo>
		</ToggleContainer>
	);
}

export default WorkToggle;
