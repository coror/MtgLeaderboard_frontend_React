import classes from './Button.module.css';

export default function Button({ children, onClick, type, disabled }) {
  return (
    <button
      className={classes.button}
      onClick={onClick}
      type={type || 'button'}
      disabled={disabled}
    >
      {disabled ? <span className={classes['lds-dual-ring']}></span> : children}
    </button>
  );
}
