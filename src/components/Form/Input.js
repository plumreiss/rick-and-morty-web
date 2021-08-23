import styled from "styled-components";

const InputForm = styled.input`
  width: 100%;
  padding: 5px;
  font-weight: 600;
  border-radius: 50px;
  background: #fafafa;
`;

export function Input({
  inputType,
  inputName,
  inputPlaceholder,
  handleChange,
  inputValue,
}) {
  return (
    <InputForm
      type={inputType}
      name={inputName}
      placeholder={inputPlaceholder}
      onChange={handleChange}
      value={inputValue}
    />
  );
}
