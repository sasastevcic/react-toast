import { useCallback, useEffect, useRef, useState } from "react";
import { createStore } from "../utils/createStore";
import { generateId } from "../utils/generateId";

export enum Toast {
  Success = "Success",
  Info = "Info",
  Error = "Error",
}
export interface IToast {
  type: Toast;
  id: number;
}

type ToastStore = {
  toasts: Array<IToast>;
  dispatch: (type: Toast) => void;
  remove: (id: number) => void;
};

export const [ToastStoreProvider, useToastStore] = createStore<ToastStore>(
  "ToastStore",
  () => {
    const [toasts, setToasts] = useState<Array<IToast>>([]);
    const timeoutRef = useRef<NodeJS.Timeout>();

    const dispatch = useCallback((type: Toast) => {
      const generateToast: IToast = {
        id: generateId.next().value as number,
        type,
      };

      setToasts((state) => [...state, generateToast]);

      timeoutRef.current = setTimeout(() => {
        setToasts((state) => {
          const [, ...rest] = state;

          return rest;
        });
      }, 10000);
    }, []);

    const remove = useCallback((id: number) => {
      setToasts((state) => state.filter(({ id: _id }) => _id !== id));
    }, []);

    useEffect(() => {
      return () => {
        clearTimeout(timeoutRef.current);
      };
    }, []);

    return {
      toasts,
      dispatch,
      remove,
    };
  }
);
