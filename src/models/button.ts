export type ButtonProps = {
  children?: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  isActive?: boolean;
  className?: string;
};
