import React from 'react';
import styled from 'styled-components';

const CloseHoverButton = styled.button`
	width: 100%;
	height: 60px;
	border: 2px solid;
	color: ${(props) =>
		props.isOnSidebar
			? props.theme.colors.accent
			: props.theme.colors.main};
	transition: 0.25s;
	background: ${(props) => (props.disabled ? 'gray' : 'transparent')};
	cursor: pointer;
	font-size: ${(props) => props.theme.fontSizes.medium};
	box-shadow: ${(props) =>
		!props.isOnSidebar ? '0px 4px 4px -1px rgba(0, 0, 0, 0.25)' : 'none'};

	&:hover:enabled {
		color: ${(props) =>
			props.isOnSidebar
				? props.theme.colors.main
				: props.theme.colors.accent};
		background-color: ${(props) =>
			props.isOnSidebar
				? props.theme.colors.accent
				: props.theme.colors.main};
	}
`;

function Button({ text, onClick, isOnSidebar = false, disabled = false }) {
	return (
		<CloseHoverButton
			isOnSidebar={isOnSidebar}
			onClick={onClick}
			disabled={disabled}
		>
			{text}
		</CloseHoverButton>
	);
}

export default Button;
