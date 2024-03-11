import React from 'react';
import ReactDOM  from 'react-dom';

import Button from './Button';
import classes from './ResponseModal.module.css';

const BackDrop = ({ onConfirm }) => {
  return <div className={classes.backdrop} onClick={onConfirm}></div>;
};

const ModalOverlay = ({ title, message, onConfirm }) => {
  return (
    <div className={classes.modal}>
      <header className={classes.header}>
        <h2>{title}</h2>
      </header>
      <div className={classes.content}>
        <p>{message}</p>
      </div>
      <Button onClick={onConfirm}>Ok</Button>
    </div>
  );
};

export default function ResponseModal({ onConfirm, title, message }) {
  return (
    <>
      {ReactDOM.createPortal(
        <BackDrop onConfirm={onConfirm} />,
        document.getElementById('backdrop-root')
      )}
      {ReactDOM.createPortal(
        <ModalOverlay title={title} message={message} onConfirm={onConfirm} />,
        document.getElementById('overlay-root')
      )}
    </>
  );
}
