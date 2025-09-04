const ResponseModalHeader: React.FC<{ title: string }> = ({ title }) => {
  return (
    <header>
      <h2 id='modal-title'>{title}</h2>
    </header>
  );
};

export default ResponseModalHeader;
