import styled from "styled-components";

const ContainerInput = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

export function ContainerInputs({ children }) {
  return <ContainerInput>{children}</ContainerInput>;
}
