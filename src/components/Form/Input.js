import styled from "styled-components";

const InputForm = styled.input`
  width: 100%;
  padding: 12px 20px;
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
