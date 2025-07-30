export default function Button({
  children,
  onClick,
  type,
  disabled,
  isActive,
  className,
}) {
  const baseStyles = 'bg-gray-200 py-1 w-32 px-3 rounded-xl';
  const activeStyles = isActive
    ? 'text-black bg-white'
    : 'text-white bg-white/10';

  return (
    <button
      className={`${className ?? ''} ${baseStyles} ${activeStyles}`}
      onClick={onClick}
      type={type || 'button'}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
