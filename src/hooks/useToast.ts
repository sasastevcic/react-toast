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
};

const DELAY = 5_000;

export const [ToastStoreProvider, useToastStore] = createStore<ToastStore>('ToastStore', () => {
	const [toasts, setToasts] = useState<Array<IToast>>([]);
	const timeoutRef = useRef<Record<number, Timer>>();

	const removeById = useCallback(
		(id: number) => setToasts((state) => state.filter(({ id: _id }) => _id !== id)),
		[],
	);

	const handleRemove = useCallback(
		(id: number) => {
			const currentTimeout = timeoutRef.current?.[id];
			currentTimeout?.clearTimeout();

			removeById(id);
		},
		[removeById],
	);

	const handleMouseEnter = useCallback((id: number) => {
		const currentTimeout = timeoutRef.current?.[id];
		currentTimeout?.pause();
	}, []);

	const handleMouseLeave = useCallback((id: number) => {
		const currentTimeout = timeoutRef.current?.[id];
		currentTimeout?.resume();
	}, []);

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
				const timeout = new Timer(() => {
					removeById(id);
				}, DELAY);

				timeoutRef.current = {
					...timeoutRef.current,
					[id]: timeout,
				};
			}
		},
		[removeById],
	);

	useEffect(() => {
		return () => {
			Object.values(timeoutRef.current ?? {}).forEach((timeout) => {
				timeout.clearTimeout();
			});
		};
	}, []);

	return {
		toasts,
		dispatch,
		handleRemove,
		handleMouseEnter,
		handleMouseLeave,
	};
});
