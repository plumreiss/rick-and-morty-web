import styled from "styled-components";

const ContainerInput = styled.div`
  display: flex;
  height: 13%;
  width: 100%;
  margin: 5px 0;
`;

export function ContainerInputs({ children }) {
  return <ContainerInput>{children}</ContainerInput>;
}
