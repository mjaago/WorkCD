import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import { useHistory } from 'react-router-dom';

const NewCompanyBtnContainer = styled.div`
	width: 100%;
	height: 60px;
`;
function NewCompanyButton() {
	const history = useHistory();

	const handleClick = () => {
		history.push('/new');
	};

	return (
		<NewCompanyBtnContainer>
			<Button
				text={'New company'}
				onSidebar={true}
				onClick={handleClick}
			/>
		</NewCompanyBtnContainer>
	);
}

export default NewCompanyButton;
