import React from 'react';
import styled from 'styled-components';

const TextFieldContainer = styled.div`
	height: 100%;
	max-height: 60px;
	width: 100%;
	display: flex;
	flex-direction: column;
`;

const Header = styled.div`
	font-size: ${(props) => props.theme.fontSizes.small};
	color: ${(props) => props.theme.colors.main};
`;

const Input = styled.input`
	height: 100%;
	width: 100%;
	font-size: ${(props) => props.theme.fontSizes.medium};
	border: solid 2px #ffd460;
	outline: none;
`;

function TextField({ header, placeholder, onChange, value, disabled = false }) {
	return (
		<TextFieldContainer>
			<Header>{header}</Header>
			<Input
				type="text"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder={placeholder}
				disabled={disabled}
			/>
		</TextFieldContainer>
	);
}

export default TextField;
