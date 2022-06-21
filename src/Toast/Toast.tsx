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
			marginTop: 0,
		},
		animate: {
			height: 'auto',
			marginTop: 10,
		},
		exit: {
			opacity: 0,
			scale: 0.9,
			height: 0,
			marginTop: 0,
			transition: {
				marginTop: {
					delay: 0.3,
				},
				height: {
					delay: 0.3,
				},
			},
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
	const { toasts, handleRemove, handleMouseEnter, handleMouseLeave } = useToastStore();

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
							{...(!isPersistent && {
								onMouseEnter: () => handleMouseEnter(id),
								onMouseLeave: () => handleMouseLeave(id),
							})}
						>
							<StyledToastItem
								$type={type}
								variants={variants.child}
								animate="animate"
								initial="initial"
							>
								{!isPersistent && (
									<StyledClose
										type="button"
										$type={type}
										onClick={() => handleRemove(id)}
										aria-label="Close notification"
									/>
								)}
								<StyledToastContent>
									<StyledTitle>{title}</StyledTitle>
									{description && <StyledDescription>{description}</StyledDescription>}
									{cta && onCtaClick && (
										<StyledCta type="button" $type={type} onClick={() => onCtaClick(id)}>
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
