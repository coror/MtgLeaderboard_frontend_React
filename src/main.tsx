import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // no need for .jsx extension in TS
import './index.css';

const rootElement = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);