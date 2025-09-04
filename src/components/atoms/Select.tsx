type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

const Select: React.FC<SelectProps> = (props) => {
  return <select {...props} className='text-black w-full p-3 rounded' />;
};

export default Select;
