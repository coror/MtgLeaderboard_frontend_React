const ResponseModalHeader: React.FC<{ title: string }> = ({ title }) => {
  const isError = title.toLowerCase().includes('error');
  const color = isError ? 'text-[#b05050]' : 'text-[#c9a959]';

  return (
    <header>
      <h2 id='modal-title' className={`${color} text-xl font-bold`}>{title}</h2>
    </header>
  );
};

export default ResponseModalHeader;
