import { useCallback, useEffect, useRef, useState } from "react";
import { createStore } from "../utils/createStore";
import { generateId } from "../utils/generateId";

export enum Toast {
  Success = "Success",
  Info = "Info",
  Error = "Error",
}

interface IToastConfig {
  title?: string;
  description?: string;
  isPersistent?: boolean;
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


export const [ToastStoreProvider, useToastStore] = createStore<ToastStore>(
  "ToastStore",
  () => {
    const [toasts, setToasts] = useState<Array<IToast>>([]);
    const timeoutRef = useRef<NodeJS.Timeout>();

    const dispatch = useCallback((type: Toast, { title, description, isPersistent }: IToastConfig = {}) => {
      const id = generateId.next().value as number;

      const generateToast: IToast = {
        title: title ?? type,
        id,
        type,
        description,
        isPersistent,
      };

      setToasts((state) => [...state, generateToast]);

      if (!isPersistent) {
        timeoutRef.current = setTimeout(() => {
          setToasts((state) => state.filter(({ id: _id }) => _id !== id));
        }, 10000);
      }
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
