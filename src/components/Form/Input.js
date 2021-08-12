export function Input({
  inputType,
  inputName,
  inputPlaceholder,
  handleChange,
  value,
}) {
  return (
    <input
      type={inputType}
      name={inputName}
      placeholder={inputPlaceholder}
      onChange={handleChange}
      value={value}
    />
  );
}
