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
	color: ${(props) =>
		props.onSidebar ? props.theme.colors.accent : props.theme.colors.main};
`;

const Input = styled.input`
	height: 100%;
	width: 100%;
	font-size: ${(props) =>
		props.onSidebar
			? props.theme.fontSizes.small
			: props.theme.fontSizes.medium};
	border: solid 2px #ffd460;
	outline: none;
	background-color: #ffffff;
`;

function TextField({
	header,
	placeholder,
	onChange,
	value,
	disabled = false,
	onSidebar = false,
}) {
	return (
		<TextFieldContainer>
			<Header onSidebar={onSidebar}>{header}</Header>
			<Input
				type="text"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder={placeholder}
				disabled={disabled}
				onSidebar={onSidebar}
			/>
		</TextFieldContainer>
	);
}

export default TextField;
