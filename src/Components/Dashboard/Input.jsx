const Input = ({ title, type, name, value, onChange, placeholder}) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="text-on-surface-variant text-[11px]">
        {title}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`outline-none text-body-sm rounded-sm text-white p-2 bg-surface-container focus:bg-surface-container-highest ${type === "number" ? "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" : ""}`}
        required
      />
    </div>
  );
};

export default Input;
