import React, { useContext, useState } from 'react';
import { SelectedCompanyContext } from '../../context';
import {
	ToggleContainer,
	ToggleBox,
	StopIcon,
	PlayIcon,
	ToggleInfo,
} from './Elements';

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
