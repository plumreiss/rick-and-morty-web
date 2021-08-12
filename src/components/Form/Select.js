export function Select({ selectName, handleChange, defaultValue, children }) {
  return (
    <select
      name={selectName}
      onChange={handleChange}
      defaultValue={defaultValue}
    >
      {children}
    </select>
  );
}
