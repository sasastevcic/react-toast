import { PanInfo } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createStore } from '../utils/createStore';
import { generateId } from '../utils/generateId';
import { Timer } from '../utils/timer';

export enum Toast {
	Success = 'Success',
	Info = 'Info',
	Warning = 'Warning',
	Error = 'Error',
}

interface IToastConfig {
	title?: string;
	description?: string;
	isPersistent?: boolean;
	cta?: string;
	onCtaClick?: (id: number) => void;
}

export interface IToast extends IToastConfig {
	type: Toast;
	id: number;
}

type ToastStore = {
	toasts: Array<IToast>;
	dispatch: (type: Toast, config?: IToastConfig) => void;
	handleRemove: (id: number) => void;
	handleMouseEnter: (id: number) => void;
	handleMouseLeave: (id: number) => void;
	handleDragEnd: (id: number, panInfo: PanInfo) => void;
};

const getSwipeLength = (offset: number, absDistance: number) => (offset / absDistance) * 100;

const DELAY = 5_000;

export const [ToastStoreProvider, useToastStore] = createStore<ToastStore>('ToastStore', () => {
	const [toasts, setToasts] = useState<Array<IToast>>([]);
	const timerRef = useRef<Record<number, Timer>>();

	const removeById = useCallback(
		(id: number) => setToasts((state) => state.filter(({ id: _id }) => _id !== id)),
		[],
	);

	const handleRemove = useCallback(
		(id: number) => {
			const currentTimer = timerRef.current?.[id];
			currentTimer?.clearTimeout();

			removeById(id);
		},
		[removeById],
	);

	const handleMouseEnter = useCallback((id: number) => {
		const currentTimer = timerRef.current?.[id];
		currentTimer?.pause();
	}, []);

	const handleMouseLeave = useCallback((id: number) => {
		const currentTimer = timerRef.current?.[id];
		currentTimer?.resume();
	}, []);

	const handleDragEnd = useCallback(
		(id: number, { offset, velocity }: PanInfo) => {
			const length = Math.round(getSwipeLength(offset.x, 200));
			const velocityX = velocity.x;

			const isSwipedEnough = length > 60 || velocityX > 100;

			if (isSwipedEnough) {
				removeById(id);
			}
		},
		[removeById],
	);

	const dispatch = useCallback(
		(type: Toast, { title, description, cta, isPersistent, onCtaClick }: IToastConfig = {}) => {
			const id = generateId.next().value as number;

			const generateToast: IToast = {
				title: title ?? type,
				id,
				type,
				description,
				cta,
				isPersistent,
				onCtaClick,
			};

			setToasts((state) => [...state, generateToast]);

			if (!isPersistent) {
				const timer = new Timer(() => {
					removeById(id);
				}, DELAY);

				timerRef.current = {
					...timerRef.current,
					[id]: timer,
				};
			}
		},
		[removeById],
	);

	useEffect(() => {
		const pauseAll = () => {
			Object.values(timerRef.current ?? {}).forEach((timer) => {
				timer.pause();
			});
		};

		const resumeAll = () => {
			Object.values(timerRef.current ?? {}).forEach((timer) => {
				timer.resume();
			});
		};

		window.addEventListener('blur', pauseAll);
		window.addEventListener('focus', resumeAll);

		return () => {
			window.removeEventListener('blur', pauseAll);
			window.removeEventListener('focus', resumeAll);

			Object.values(timerRef.current ?? {}).forEach((timer) => {
				timer.clearTimeout();
			});
		};
	}, []);

	return {
		toasts,
		dispatch,
		handleRemove,
		handleMouseEnter,
		handleMouseLeave,
		handleDragEnd,
	};
});
