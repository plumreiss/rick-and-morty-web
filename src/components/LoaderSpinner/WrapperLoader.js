import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ takeViewportHeight }) =>
    takeViewportHeight &&
    `
      min-height: calc(100vh -  ${takeViewportHeight}px);
    `}
`;

export function WrapperLoader({ children, takeViewportHeight }) {
  return <Wrapper takeViewportHeight={takeViewportHeight}>{children}</Wrapper>;
}
