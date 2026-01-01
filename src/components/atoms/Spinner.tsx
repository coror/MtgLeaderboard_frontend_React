import { SpinnerProps } from '../../models/spinner';

const Spinner: React.FC<SpinnerProps> = ({
  size = 48,
}) => {
  return (
    <div className='fixed inset-0 flex justify-center items-center bg-black/50 z-50'>
      <div
        className='loading-spinner'
        style={{ width: size, height: size }}
        role='status'
        aria-label='Loading'
      ></div>
    </div>
  );
};

export default Spinner;
