export default function Button({
  children,
  onClick,
  type,
  disabled,
  isActive,
}) {
  return (
    <button
      className={`py-1 px-3 w-32 rounded-xl ${
        isActive ? 'text-black bg-white' : 'text-white bg-white/10'
      }`}
      onClick={onClick}
      type={type || 'button'}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
