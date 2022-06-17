import { useCallback, useEffect, useRef, useState } from 'react';
import { createStore } from '../utils/createStore';

export type ToastType = 'Success' | 'Error';

type ToastStore = {
	toasts: Array<ToastType>;
	trigger: (type: ToastType) => void;
};

export const [ToastStoreProvider, useToastStore] = createStore<ToastStore>('ToastStore', () => {
	const [toasts, setToasts] = useState<Array<ToastType>>([]);
	const timeoutRef = useRef<NodeJS.Timeout>();

	const trigger = useCallback((type: ToastType) => {
		setToasts((state) => [...state, type]);
	}, []);

	useEffect(() => {
    console.log('effect');
    
		timeoutRef.current = setTimeout(() => {
      
      setToasts((state) => {
        const [, ...rest] = state;

        return rest;
      })
		}, 2000);

    return () => {
      clearTimeout(timeoutRef.current);
    }
	}, [toasts]);

  console.log({ toasts });
  

	return {
		toasts,
		trigger,
	};
});
