export default function Form({ onSubmit, children, className, ...props }) {
  return (
    <form
      onSubmit={onSubmit}
      className={`${className ?? ''} flex flex-col items-center p-4 text-white`}
      {...props}
    >
      {children}
    </form>
  );
}
