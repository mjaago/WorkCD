import React from 'react';
import styled from 'styled-components';

const Spinner = styled.div`
	display: inline-block;
	width: 80px;
	height: 80px;

	&:after {
		content: ' ';
		display: block;
		width: 64px;
		height: 64px;
		margin: 8px;
		border-radius: 50%;
		border: 6px solid
			${(props) =>
				props.isOnSidebar
					? props.theme.colors.accent
					: props.theme.colors.main};
		border-color: ${(props) =>
				props.isOnSidebar
					? props.theme.colors.accent
					: props.theme.colors.main}
			transparent
			${(props) =>
				props.isOnSidebar
					? props.theme.colors.accent
					: props.theme.colors.main}
			transparent;
		animation: lds-dual-ring 1.2s linear infinite;
	}
	@keyframes lds-dual-ring {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;

const SpinnerContainer = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	justify-content: center;
	align-items: center;
`;

function LoadingSpinner({ isOnSidebar }) {
	return (
		<SpinnerContainer>
			<Spinner isOnSidebar={isOnSidebar} />
		</SpinnerContainer>
	);
}

export default LoadingSpinner;
