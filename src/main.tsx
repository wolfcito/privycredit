import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { AppProvider } from './context/AppContext';
import { AppKitProvider } from './context/AppKitProvider';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppKitProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </AppKitProvider>
  </StrictMode>
);
