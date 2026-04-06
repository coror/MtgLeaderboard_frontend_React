import { useState, useRef, useEffect } from 'react';

type Option = {
  value: string;
  label: string;
  disabled?: boolean;
};

type CustomSelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  className?: string;
};

export default function CustomSelect({
  value,
  onChange,
  options,
  placeholder = 'Select...',
  className = '',
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string, disabled?: boolean) => {
    if (disabled) return;
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Selected Value Button */}
      <button
        type='button'
        onClick={() => setIsOpen(!isOpen)}
        className='w-full overflow-hidden bg-[#1a1812]/80 border border-[rgba(201,169,89,0.2)] text-[#e0d7c8] text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[rgba(201,169,89,0.4)] flex items-center justify-between gap-2 transition-all hover:bg-[#1a1812]'
      >
        <span className={`block truncate min-w-0 ${selectedOption ? 'text-white' : 'text-white/50'}`}>
          {selectedOption?.label || placeholder}
        </span>
        <svg
          className={`w-4 h-4 flex-shrink-0 text-white/70 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
        </svg>
      </button>

      {/* Dropdown Options */}
      {isOpen && (
        <div className='absolute z-50 w-full mt-1 bg-gradient-to-br from-[#1a1812] via-[#0f0e0b] to-[#1a1812] border border-[rgba(201,169,89,0.2)] rounded-lg shadow-2xl overflow-hidden max-h-48 overflow-y-auto'>
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option.value, option.disabled)}
              className={`px-3 py-2 text-sm cursor-pointer transition-all
                ${option.disabled
                  ? 'text-white/30 cursor-not-allowed'
                  : 'text-[#e0d7c8] hover:bg-[rgba(201,169,89,0.1)]'
                }
                ${option.value === value ? 'bg-[rgba(201,169,89,0.15)] name-shimmer font-semibold' : ''}
              `}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
