import styled from 'styled-components';
import { rgba, size } from 'polished';
import { Toast } from '../hooks/useToast';
import { motion } from 'framer-motion';

export const StyledToast = styled.div`
	display: flex;
	flex-direction: column;
	position: fixed;
	bottom: 5rem;
	right: 5rem;
`;

const colorLookup: Record<Toast, { color: string; backgroundColor: string }> = {
	[Toast.Success]: {
		color: 'white',
		backgroundColor: 'green',
	},
	[Toast.Info]: {
		color: 'black',
		backgroundColor: 'yellow',
	},
	[Toast.Error]: {
		color: 'white',
		backgroundColor: 'red',
	},
};

export const StyledToastHolder = styled(motion.div)`
	&:not(:first-child) {
		margin-top: 1rem;
	}
`;

export const StyledToastItem = styled(motion.div)<{ $type: Toast }>`
	width: 20rem;
	position: relative;
	border-radius: 1rem;
	backdrop-filter: blur(0.5rem);

	background-color: ${({ $type }) => rgba(colorLookup[$type].backgroundColor, 0.6)};
	color: ${({ $type }) => colorLookup[$type].color};
	transition: background-color 0.2s ease-in-out;

	&:hover {
		background-color: ${({ $type }) => rgba(colorLookup[$type].backgroundColor, 1)};
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

export const StyledClose = styled.button`
	${size('2rem')};
	color: inherit;
	position: absolute;
	top: 1rem;
	right: 1rem;
	border-radius: 50%;
	border: 1px solid currentColor;

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
	}

	&::before {
		transform: translate(-50%, -50%) rotate(45deg);
	}

	&::after {
		transform: translate(-50%, -50%) rotate(-45deg);
	}
`;

export const StyledCta = styled.button`
	color: inherit;
	font-size: 1.2rem;
	padding: 0.5rem 1rem;
	border-radius: 2.5rem;
	border: 1px solid currentColor;
	margin-top: 1rem;
`;
