import styled from "styled-components";

const StyledSubtitle = styled.h2`
  color: #f4f4f4;
`;

export function Subtitle({ children }) {
  return <StyledSubtitle>{children}</StyledSubtitle>;
}
