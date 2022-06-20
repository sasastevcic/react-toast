import styled, { css, DefaultTheme, FlattenInterpolation, ThemeProps } from 'styled-components';
import { Toast } from './hooks/useToast';

interface StyledButtonProps {
	$buttonTheme?: Toast;
}

const success = css`
	background-color: green;
	color: white;
`;

const info = css`
	background-color: blue;
	color: white;
`;

const warning = css`
	background-color: yellow;
	color: black;
`;

const error = css`
	background-color: red;
	color: white;
`;

const themes: { [key in Toast]: FlattenInterpolation<ThemeProps<DefaultTheme>> } = {
	[Toast.Success]: success,
	[Toast.Info]: info,
	[Toast.Warning]: warning,
	[Toast.Error]: error,
};

export const StyledToastButton = styled.button<StyledButtonProps>`
	font-size: 2rem;
	padding: 0.2rem 2.5rem;
	min-height: 4rem;
	border-radius: 4.6rem;
	margin: 0 0.5rem;

	${({ $buttonTheme }) => $buttonTheme && themes[$buttonTheme]};
`;
