import { ReactElement } from "react";
import { useToastStore } from "../hooks/useToast";
import Portal from "../utils/portal";
import { StyledToast, StyledToastItem, StyledClose } from "./Toast.styles";

export const Toast = (): ReactElement => {
  const { toasts, remove } = useToastStore();

  return (
    <Portal portalId="toast">
      <StyledToast>
        {toasts.map(({ id, type, title, description, isPersistent }) => (
          <StyledToastItem key={id} $type={type}>
            {!isPersistent && <StyledClose onClick={() => remove(id)}>X</StyledClose>}
            <h4>{title}</h4>
            {description && <p>{description}</p>}
          </StyledToastItem>
        ))}
      </StyledToast>
    </Portal>
  );
};
