import styled from "styled-components";

const StyledErrorMessage = styled.h3`
  color: rgb(158, 158, 158);
  font-size: 1.3rem;
  font-weight: 700;
`;

export function ErrorMessage() {
  return <StyledErrorMessage>Have ocurred an error</StyledErrorMessage>;
}
