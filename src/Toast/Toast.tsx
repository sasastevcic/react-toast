import { ReactElement } from "react";
import { useToastStore } from "../hooks/useToast";
import Portal from "../utils/portal";
import { StyledToast, StyledToastItem, StyledClose } from "./Toast.styles";

export const Toast = (): ReactElement => {
  const { toasts, remove } = useToastStore();

  return (
    <Portal portalId="toast">
      <StyledToast data-testid="Toast">
        {toasts.map(({ id, type }) => (
          <StyledToastItem key={id}>
            <StyledClose onClick={() => remove(id)}>X</StyledClose>
            Toast {type}
          </StyledToastItem>
        ))}
      </StyledToast>
    </Portal>
  );
};
