import { ButtonProps } from '../../models/button';

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type,
  disabled,
  isActive,
  className,
}) => {
  const baseStyles = `
    w-44 px-5 py-3 min-h-12
    rounded-2xl
    font-bold text-lg
    relative
    overflow-hidden
    transition-all duration-150 ease-out
    shadow-[0_6px_0_rgba(0,0,0,0.4)]
    active:translate-y-[4px] active:shadow-[0_2px_0_rgba(0,0,0,0.4)]
    hover:scale-105
    select-none
    touch-manipulation
  `;

  const gradientBg = `
    bg-gradient-to-br from-amber-500/30 via-orange-600/30 to-red-500/30
  `;

  const highlightLayer = `
    before:content-['']
    before:absolute before:inset-0
    before:rounded-2xl
    before:bg-gradient-to-b
    before:from-white/30 before:to-transparent
    before:pointer-events-none
  `;

  const textColor = isActive ? 'text-black' : 'text-white';

  return (
    <button
      className={`
        ${className ?? ''} 
        ${baseStyles} 
        ${gradientBg} 
        ${highlightLayer} 
        ${textColor}
      `}
      onClick={onClick}
      type={type || 'button'}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
