import { AnimatePresence, Variants } from 'framer-motion';
import { ReactElement } from 'react';
import { useToastStore } from '../hooks/useToast';
import Portal from '../utils/portal';
import {
	StyledToast,
	StyledToastHolder,
	StyledToastItem,
	StyledToastContent,
	StyledTitle,
	StyledDescription,
	StyledClose,
	StyledCta,
} from './Toast.styles';

const variants: Record<'parent' | 'child', Variants> = {
	parent: {
		initial: {
			height: 0,
		},
		animate: {
			height: 'auto',
		},
		exit: {
			opacity: 0,
			scale: 0.9,
		},
	},
	child: {
		initial: {
			y: '100%',
		},
		animate: {
			y: 0,
		},
	},
};

export const Toast = (): ReactElement => {
	const { toasts, remove } = useToastStore();

	return (
		<Portal portalId="toast">
			<StyledToast>
				<AnimatePresence>
					{toasts.map(({ id, type, title, description, cta, isPersistent, onCtaClick }) => (
						<StyledToastHolder
							key={id}
							variants={variants.parent}
							animate="animate"
							initial="initial"
							exit="exit"
						>
							<StyledToastItem
								$type={type}
								variants={variants.child}
								animate="animate"
								initial="initial"
							>
								{!isPersistent && (
									<StyledClose onClick={() => remove(id)} aria-label="Close notification" />
								)}
								<StyledToastContent>
									<StyledTitle>{title}</StyledTitle>
									{description && <StyledDescription>{description}</StyledDescription>}
									{cta && onCtaClick && (
										<StyledCta type="button" onClick={() => onCtaClick(id)}>
											{cta}
										</StyledCta>
									)}
								</StyledToastContent>
							</StyledToastItem>
						</StyledToastHolder>
					))}
				</AnimatePresence>
			</StyledToast>
		</Portal>
	);
};
