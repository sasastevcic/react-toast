import { ReactElement } from 'react';
import { useToastStore } from '../hooks/useToast';
import Portal from '../utils/portal';
import {
	StyledToast,
	StyledToastItem,
	StyledTitle,
	StyledDescription,
	StyledClose,
	StyledCta,
} from './Toast.styles';

export const Toast = (): ReactElement => {
	const { toasts, remove } = useToastStore();

	return (
		<Portal portalId="toast">
			<StyledToast>
				{toasts.map(({ id, type, title, description, cta, isPersistent, onCtaClick }) => (
					<StyledToastItem key={id} $type={type}>
						{!isPersistent && (
							<StyledClose onClick={() => remove(id)} aria-label="Close notification" />
						)}
						<StyledTitle>{title}</StyledTitle>
						{description && <StyledDescription>{description}</StyledDescription>}
						{cta && onCtaClick && (
							<StyledCta type="button" onClick={() => onCtaClick(id)}>
								{cta}
							</StyledCta>
						)}
					</StyledToastItem>
				))}
			</StyledToast>
		</Portal>
	);
};
