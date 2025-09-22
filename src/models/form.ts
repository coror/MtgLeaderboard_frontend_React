export type FormProps = React.FormHTMLAttributes<HTMLFormElement> & {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
  className?: string;
};
