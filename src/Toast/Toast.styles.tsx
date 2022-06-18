import styled from "styled-components";

export const StyledToast = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 5rem;
  right: 5rem;
`;

export const StyledToastItem = styled.div`
  height: 4rem;
  width: 10rem;
  padding: 1rem 2rem;
  margin-top: 1rem;
  background-color: red;
  position: relative;
`;

export const StyledClose = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: transparent;
  padding: 0;
  border: 0;
`;
