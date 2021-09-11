import styled, { css } from "styled-components";

const WrapperCards = styled.section`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 3.5rem 0;
  max-width: 70%;
  margin: 0 auto;

  ${({ takeViewportHeight }) =>
    takeViewportHeight &&
    css`
      min-height: calc(100vh - ${takeViewportHeight}px);
    `}
`;

export function ContainerCards({ children, takeViewportHeight }) {
  return (
    <WrapperCards takeViewportHeight={takeViewportHeight}>
      {children}
    </WrapperCards>
  );
}
