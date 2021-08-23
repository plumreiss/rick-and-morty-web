import styled from "styled-components";

const InputSelect = styled.select`
  width: 100%;
  padding: 5px;
  border-radius: 4px;
  background-color: rgb(51, 51, 51);
  color: #f4f4f4;
`;

export function Select({ selectName, handleChange, defaultValue, children }) {
  return (
    <InputSelect
      name={selectName}
      onChange={handleChange}
      defaultValue={defaultValue}
    >
      {children}
    </InputSelect>
  );
}
