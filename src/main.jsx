import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { EarthquakeProvider } from './context/EarthquakeContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <EarthquakeProvider>
      <App />
    </EarthquakeProvider>
  </React.StrictMode>
);