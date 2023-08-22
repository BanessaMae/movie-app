import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './services/components/app';
import '../src/index.css';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
