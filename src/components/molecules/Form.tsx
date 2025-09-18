type FormProps = React.FormHTMLAttributes<HTMLFormElement> & {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
  className?: string;
};

export default function Form({
  onSubmit,
  children,
  className = '',
  ...props
}: FormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className={`${className} flex flex-col items-center p-4 text-white`}
      {...props}
    >
      {children}
    </form>
  );
}
