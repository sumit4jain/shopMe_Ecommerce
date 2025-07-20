import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // ✅ importing the App component
import './index.css'; // optional, if you're using Tailwind

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


