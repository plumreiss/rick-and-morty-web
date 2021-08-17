import styled from "styled-components";

const InputOption = styled.option`
  color: #f4f4f4;
`;

export function Option({ optionValue, nameValue }) {
  return <InputOption value={optionValue}>{nameValue}</InputOption>;
}
