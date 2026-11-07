import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import App from './App.jsx';
import { initWebVitals } from './utils/webVitals';

// Initialize Core Web Vitals performance telemetry
initWebVitals(({ name, value, rating, unit }) => {
  if (process.env.NODE_ENV === 'development') {
    // Development non-intrusive metric log
    console.debug(`[Web Vitals] ${name}: ${value}${unit} (${rating})`);
  }
});

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
