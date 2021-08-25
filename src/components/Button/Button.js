import styled from "styled-components";

const ButtonStyled = styled.button`
  padding: 0.25em 1em;
  color: rgb(60, 62, 68, 1);
  font-size: 1em;
  font-weight: 700;
  cursor: pointer;
  background: #f4f4f4;
  border: none;
  border-radius: 4px;
`;

export function Button({ value, handleOnClick }) {
  return <ButtonStyled onClick={handleOnClick}>{value}</ButtonStyled>;
}
