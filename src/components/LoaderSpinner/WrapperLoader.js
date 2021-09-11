import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export function WrapperLoader({ children }) {
  return <Wrapper>{children}</Wrapper>;
}
