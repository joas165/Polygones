import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

// Non-null assertion operator to tell TypeScript the root element exists
const root = ReactDOM.createRoot(document.getElementById('root')!); 

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Measure performance (optional)
reportWebVitals();
