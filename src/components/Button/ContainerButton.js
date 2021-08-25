import styled from "styled-components";

const WrapperButton = styled.div`
  margin: 20px auto;
  text-align: center;
`;

export function ContainerButton({ children }) {
  return <WrapperButton>{children}</WrapperButton>;
}
