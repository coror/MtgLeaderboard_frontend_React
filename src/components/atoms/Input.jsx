export default function Input({
  type,
  name,
  placeholder,
  value,
  onChange,
  checked,
  className,
}) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`${className} text-black mt-4 rounded-lg p-3 text-sm`}
      {...(type === 'checkbox' || type === 'radio' ? { checked } : {})}
    />
  );
}
