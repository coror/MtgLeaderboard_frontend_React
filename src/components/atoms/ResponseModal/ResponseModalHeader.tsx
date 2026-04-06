const ResponseModalHeader: React.FC<{ title: string }> = ({ title }) => {
  return (
    <header>
      <h2 id='modal-title' className='text-red-800 text-xl font-bold'>{title}</h2>
    </header>
  );
};

export default ResponseModalHeader;
