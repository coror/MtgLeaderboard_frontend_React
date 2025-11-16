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
    rounded-lg
    font-semibold text-base tracking-wide
    relative
    overflow-hidden
    transition-all duration-300 ease-out
    select-none
    touch-manipulation
  `;

  // Clean dark fantasy gradient
  const gradientBg = `
    bg-gradient-to-br from-slate-800 via-slate-900 to-black
  `;

  // Clean shadow definition without visible border
  const borderStyle = `
    shadow-[0_4px_16px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.05),inset_0_-1px_0_rgba(0,0,0,0.5)]
  `;

  // Subtle inner glow for depth
  const innerGlow = `
    after:content-['']
    after:absolute
    after:inset-[1px]
    after:rounded-lg
    after:bg-gradient-to-br
    after:from-amber-500/5
    after:to-transparent
    after:pointer-events-none
  `;

  // Hover state (desktop only)
  const hoverState = `
    md:hover:shadow-[0_6px_24px_rgba(217,119,6,0.4),inset_0_1px_0_rgba(251,191,36,0.15),inset_0_-1px_0_rgba(0,0,0,0.5)]
    md:hover:brightness-110
  `;

  // Active state
  const activeState = `
    active:scale-[0.98]
    active:shadow-[0_0_15px_rgba(0,0,0,0.6),inset_0_2px_4px_rgba(0,0,0,0.3)]
  `;

  // Clean text with subtle glow on active
  const textColor = isActive
    ? 'text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]'
    : 'text-slate-100 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]';

  const textLayer = 'relative z-10';

  return (
    <button
      className={`
        ${className ?? ''}
        ${baseStyles}
        ${gradientBg}
        ${borderStyle}
        ${innerGlow}
        ${hoverState}
        ${activeState}
        ${textColor}
      `}
      onClick={onClick}
      type={type || 'button'}
      disabled={disabled}
    >
      <span className={textLayer}>{children}</span>
    </button>
  );
};

export default Button;
