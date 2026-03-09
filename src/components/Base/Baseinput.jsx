import { useRef } from "react";

export default function Input({
  label,
  type = "text",
  name,
  value,
  placeholder,
  onChange,
  className = "",
  required = false,
  disabled = false,
  error = "",
}) {
  const inputRef = useRef(null);

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label htmlFor={name} className="text-sm font-medium">
          {label}
        </label>
      )}

      <input
        ref={inputRef} 
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`border rounded-md px-3 py-2 text-sm outline-none 
          focus:ring-2 focus:ring-blue-500
          disabled:bg-gray-100 disabled:cursor-not-allowed
          ${error ? "border-red-500" : "border-gray-300"} 
          ${className}`}
      />

      {/* Conditional rendering in React */}
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </div>
  );
}
