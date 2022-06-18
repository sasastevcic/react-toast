import { useCallback, useEffect, useRef, useState } from "react";
import { createStore } from "../utils/createStore";
import { v4 as uuidv4 } from "uuid";

export enum Toast {
  Success = "Success",
  Error = "Error",
}
export interface IToast {
  type: Toast;
  id: ReturnType<typeof uuidv4>;
}

type ToastStore = {
  toasts: Array<IToast>;
  dispatch: (type: Toast) => void;
  remove: (id: string) => void;
};

export const [ToastStoreProvider, useToastStore] = createStore<ToastStore>(
  "ToastStore",
  () => {
    const [toasts, setToasts] = useState<Array<IToast>>([]);
    const timeoutRef = useRef<NodeJS.Timeout>();

    const dispatch = useCallback((type: Toast) => {
      const generateToast: IToast = {
        id: uuidv4(),
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

    const remove = useCallback((id: string) => {
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
