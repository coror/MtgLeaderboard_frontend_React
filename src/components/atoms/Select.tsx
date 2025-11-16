import { SelectProps } from '../../models/select';

const Select: React.FC<SelectProps> = ({ className, ...props }) => {
  return <select {...props} className={`text-black p-3 rounded ${className || 'w-full'}`} />;
};

export default Select;
