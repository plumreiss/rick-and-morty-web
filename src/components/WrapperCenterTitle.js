import styled from "styled-components";

const Wrapper = styled.div`
  text-align: center;
`;

export function WrapperCenterTitle({ children }) {
  return <Wrapper>{children}</Wrapper>;
}
