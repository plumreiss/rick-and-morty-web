export function Input({
  inputType,
  inputName,
  inputPlaceholder,
  handleChange,
  inputValue,
}) {
  return (
    <input
      type={inputType}
      name={inputName}
      placeholder={inputPlaceholder}
      onChange={handleChange}
      value={inputValue}
    />
  );
}
