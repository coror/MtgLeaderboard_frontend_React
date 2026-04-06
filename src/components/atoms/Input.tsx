import { InputProps } from '../../models/input';

const Input: React.FC<InputProps> = ({
  type = 'text',
  className,
  ...props
}) => {
  return (
    <input
      type={type}
      className={`${className} bg-[#1a1812]/80 border border-[rgba(201,169,89,0.2)] text-[#e0d7c8] mt-4 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[rgba(201,169,89,0.4)] placeholder:text-[#e0d7c8]/40`}
      {...props}
    />
  );
};

export default Input;
