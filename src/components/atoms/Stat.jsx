export default function Stat({ label, value, accent }) {
  return (
    <div className='flex flex-col items-center gap-1'>
      <span className={`text-xl font-bold ${accent}`}>{value}</span>
      <span className='text-sm text-zinc-400'>{label}</span>
    </div>
  );
}
