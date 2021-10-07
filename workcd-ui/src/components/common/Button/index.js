import React from 'react';
import styled from 'styled-components';

const CloseHoverButton = styled.button`
	width: 100%;
	height: 100%;
	border: 2px solid;
	color: ${(props) =>
		props.onSidebar ? props.theme.colors.accent : props.theme.colors.main};
	transition: 0.25s;
	background: transparent;
	cursor: pointer;
	font-size: ${(props) => props.theme.fontSizes.medium};
	box-shadow: ${(props) =>
		!props.onSidebar ? '0px 4px 4px -1px rgba(0, 0, 0, 0.25)' : 'none'};

	&:hover {
		color: ${(props) =>
			props.onSidebar
				? props.theme.colors.main
				: props.theme.colors.accent};
		background-color: ${(props) =>
			props.onSidebar
				? props.theme.colors.accent
				: props.theme.colors.main};
	}
`;

function Button({ text, onClick, onSidebar = false }) {
	return (
		<CloseHoverButton onSidebar={onSidebar} onClick={onClick}>
			{text}
		</CloseHoverButton>
	);
}

export default Button;
