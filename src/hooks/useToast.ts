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
	remove: (id: number) => void;
};

export const [ToastStoreProvider, useToastStore] = createStore<ToastStore>('ToastStore', () => {
	const [toasts, setToasts] = useState<Array<IToast>>([]);
	const timeoutRef = useRef<Record<number, NodeJS.Timeout>>();

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
				const timeout = setTimeout(() => {
					setToasts((state) => state.filter(({ id: _id }) => _id !== id));
				}, 10000);

				timeoutRef.current = {
					...timeoutRef.current,
					[id]: timeout,
				};
			}
		},
		[],
	);

	const remove = useCallback((id: number) => {
		const currentTimeout = timeoutRef.current?.[id];
		clearTimeout(currentTimeout);

		setToasts((state) => state.filter(({ id: _id }) => _id !== id));
	}, []);

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
		remove,
	};
});
