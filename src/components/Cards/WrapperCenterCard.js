import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 60px);
  margin: 1.3rem;
`;

export function WrapperCenterCard({ children }) {
  return <Wrapper>{children}</Wrapper>;
}
