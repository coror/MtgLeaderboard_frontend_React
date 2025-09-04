import React from 'react';

type StatProps = {
  label: string;
  value: number | string;
  accent?: string;
  className?: string;
};

const Stat: React.FC<StatProps> = ({
  label,
  value,
  accent = 'text-white',
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center gap-1 ${className}`}>
      <span className={`text-xl font-bold ${accent}`}>{value}</span>
      <span className='text-sm text-zinc-400'>{label}</span>
    </div>
  );
};

export default Stat;
