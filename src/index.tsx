import React from 'react';
import ReactDOM from 'react-dom/client';

// CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

// Composants
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Mesurer les performances (optionnel)
reportWebVitals();
