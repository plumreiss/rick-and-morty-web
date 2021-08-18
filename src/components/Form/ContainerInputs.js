import styled from "styled-components";

const ContainerInput = styled.div`
  display: flex;
`;

export function ContainerInputs({ children }) {
  return <ContainerInput>{children}</ContainerInput>;
}
