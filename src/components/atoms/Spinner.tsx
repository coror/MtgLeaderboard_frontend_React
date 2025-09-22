import { SpinnerProps } from '../../models/spinner';

const Spinner: React.FC<SpinnerProps> = ({
  size = 48,
  color = 'border-t-black',
}) => {
  return (
    <div className='fixed inset-0 flex justify-center items-center bg-black/25 z-50'>
      <div
        className={`border-4 border-gray-300 ${color} rounded-full animate-spin`}
        style={{ width: size, height: size }}
        role='status'
        aria-label='Loading'
      ></div>
    </div>
  );
};

export default Spinner;
