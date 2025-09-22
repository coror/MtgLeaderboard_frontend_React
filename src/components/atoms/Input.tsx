import { InputProps } from '../../models/input';

const Input: React.FC<InputProps> = ({
  type = 'text',
  className,
  ...props
}) => {
  return (
    <input
      type={type}
      className={`${className} text-black mt-4 rounded-lg p-3 text-sm`}
      {...props}
    />
  );
};

export default Input;
