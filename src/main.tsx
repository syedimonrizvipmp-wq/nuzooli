import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { QuranProvider } from './context/QuranContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QuranProvider>
      <App />
    </QuranProvider>
  </React.StrictMode>
);
