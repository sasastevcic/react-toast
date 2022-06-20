import styled from "styled-components";
import { rgba } from 'polished';
import { Toast } from "../hooks/useToast";

export const StyledToast = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 5rem;
  right: 5rem;
`;

const colorLookup: Record<Toast, { color: string; backgroundColor: string }> = {
  [Toast.Success]: {
    color: 'white',
    backgroundColor: 'green',
  },
  [Toast.Info]: {
    color: 'black',
    backgroundColor: 'yellow',
  },
  [Toast.Error]: {
    color: 'white',
    backgroundColor: 'red',
  },
}

export const StyledToastItem = styled.div<{ $type: Toast }>`
  font-size: 1.6rem;
  min-height: 6rem;
  width: 20rem;
  padding: 1rem 2rem;
  position: relative;
  border-radius: 1rem;
  backdrop-filter: blur(0.5rem);

  &:not(:first-child) {
    margin-top: 1rem;
  }

  background-color: ${({ $type }) => rgba(colorLookup[$type].backgroundColor, 0.6)};
  color: ${({ $type }) => colorLookup[$type].color};
`;

export const StyledClose = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: transparent;
  padding: 0;
  border: 0;
`;
