import { ReactElement } from 'react';
import { useToastStore } from '../hooks/useToast';
import Portal from '../utils/portal';
import { StyledToast, StyledToastItem } from './Toast.styles';

export const Toast = (): ReactElement => {
	const { toasts } = useToastStore();

	return (
		<Portal portalId="toast">
			<StyledToast data-testid="Toast">
				{toasts.map((toast, index) => (
					<StyledToastItem key={index}>
						Toast {toast}
					</StyledToastItem>
				))}
			</StyledToast>
		</Portal>
	);
};
