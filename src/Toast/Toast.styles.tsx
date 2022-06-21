import styled from 'styled-components';
import { rgba, size } from 'polished';
import { Toast } from '../hooks/useToast';
import { motion } from 'framer-motion';

interface TypeProps {
	$type: Toast;
}

const colorLookup: Record<Toast, { primary: string; secondary: string }> = {
	[Toast.Success]: {
		primary: 'green',
		secondary: 'white',
	},
	[Toast.Info]: {
		primary: 'blue',
		secondary: 'white',
	},
	[Toast.Warning]: {
		primary: 'yellow',
		secondary: 'black',
	},
	[Toast.Error]: {
		primary: 'red',
		secondary: 'white',
	},
};

export const StyledToast = styled.div`
	display: flex;
	flex-direction: column;
	position: fixed;
	bottom: 5rem;
	right: 5rem;
`;

export const StyledToastHolder = styled(motion.div)``;

export const StyledToastItem = styled(motion.div)<TypeProps>`
	width: 20rem;
	position: relative;
	border-radius: 1rem;
	backdrop-filter: blur(0.5rem);

	background-color: ${({ $type }) => rgba(colorLookup[$type].primary, 0.6)};
	color: ${({ $type }) => colorLookup[$type].secondary};
	transition: background-color 0.2s ease-in-out;

	&:hover {
		background-color: ${({ $type }) => rgba(colorLookup[$type].primary, 1)};
	}
`;

export const StyledToastContent = styled.div`
	min-height: 6rem;
	padding: 1.5rem 2rem;
`;

export const StyledTitle = styled.h5`
	font-size: 1.4rem;
	padding-right: 2rem;
	margin-bottom: 0.5rem;
`;

export const StyledDescription = styled.p`
	font-size: 1.2rem;
	margin-bottom: 1rem;
`;

export const StyledClose = styled.button<TypeProps>`
	${size('2rem')};
	color: inherit;
	position: absolute;
	top: 1rem;
	right: 1rem;
	border-radius: 50%;
	border: 1px solid currentColor;
	transition: background-color 0.2s ease-in-out;

	&::before,
	&::after {
		content: '';
		color: inherit;
		background-color: currentColor;
		position: absolute;
		height: 1px;
		width: calc(100% - 0.8rem);
		left: 50%;
		top: 50%;
		transition: background-color 0.2s ease-in-out;
	}

	&::before {
		transform: translate(-50%, -50%) rotate(45deg);
	}

	&::after {
		transform: translate(-50%, -50%) rotate(-45deg);
	}

	&:hover {
		background-color: currentColor;

		&::before,
		&::after {
			background-color: ${({ $type }) => colorLookup[$type].primary};
		}
	}
`;

export const StyledCta = styled.button<TypeProps>`
	color: inherit;
	font-size: 1.2rem;
	padding: 0.5rem 1rem;
	border-radius: 2.5rem;
	border: 1px solid currentColor;
	margin-top: 1rem;
	transition: 0.2s ease-in-out;
	transition-property: color, border-color, background-color;

	&:hover {
		color: ${({ $type }) => colorLookup[$type].primary};
		border-color: ${({ $type }) => colorLookup[$type].secondary};
		background-color: ${({ $type }) => colorLookup[$type].secondary};
	}
`;
