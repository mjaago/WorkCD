import React from 'react';
import Button from '../common/Button';
import { useHistory } from 'react-router-dom';
import { NewCompanyBtnContainer } from './Elements';

function NewCompanyButton() {
	const history = useHistory();

	const handleClick = () => {
		history.push('/new');
	};

	return (
		<NewCompanyBtnContainer>
			<Button
				text={'New company'}
				isOnSidebar={true}
				onClick={handleClick}
			/>
		</NewCompanyBtnContainer>
	);
}

export default NewCompanyButton;
