export function FormInput({ label, name, type, placeholder, value, onChange }) {
  return (
    <div className="space-y-2 ">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="border p-2 rounded"
      />
    </div>
  );
}
