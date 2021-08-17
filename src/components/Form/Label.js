import styled from "styled-components";

const InputLabel = styled.label`
  color: rgb(51, 51, 51);
  font-size: 1.2rem;
`;

export function Label({ labelName }) {
  return <InputLabel>{labelName}</InputLabel>;
}
