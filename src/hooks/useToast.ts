import { useCallback, useEffect, useRef, useState } from 'react';
import { createStore } from '../utils/createStore';
import { generateId } from '../utils/generateId';

export enum Toast {
	Success = 'Success',
	Info = 'Info',
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
	const timeoutRef = useRef<Record<number, NodeJS.Timeout>>();

	const removeById = useCallback(
		(id: number) => setToasts((state) => state.filter(({ id: _id }) => _id !== id)),
		[],
	);

	const handleTimeout = useCallback(
		(id: number) => {
			const timeout = setTimeout(() => {
				removeById(id);
			}, DELAY);

			timeoutRef.current = {
				...timeoutRef.current,
				[id]: timeout,
			};
		},
		[removeById],
	);

	const handleRemove = useCallback(
		(id: number) => {
			const currentTimeout = timeoutRef.current?.[id];
			clearTimeout(currentTimeout);

			removeById(id);
		},
		[removeById],
	);

	const handleMouseEnter = useCallback((id: number) => {
		const currentTimeout = timeoutRef.current?.[id];
		clearTimeout(currentTimeout);
	}, []);

	const handleMouseLeave = useCallback(
		(id: number) => {
			handleTimeout(id);
		},
		[handleTimeout],
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
				handleTimeout(id);
			}
		},
		[handleTimeout],
	);

	useEffect(() => {
		return () => {
			Object.values(timeoutRef.current ?? {}).forEach((timeout) => {
				clearTimeout(timeout);
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
