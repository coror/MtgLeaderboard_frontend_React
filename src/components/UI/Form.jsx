import Button from './Button';

export default function Form({ onSubmit, title, children }) {
  return (
    <form onSubmit={onSubmit} className='flex flex-col p-2 m-2 items-center'>
      <h1>{title}</h1>
      {children}
      <div>
        <Button type='submit'>Submit</Button>
      </div>
    </form>
  );
}
