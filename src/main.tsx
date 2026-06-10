import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import { AuthProvider } from './contexts/AuthContext.tsx';
import { LanguageProvider } from './contexts/LanguageContext.tsx';
import { PayPalWrapper } from './components/PayPalWrapper.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <LanguageProvider>
        <PayPalWrapper>
          <App />
        </PayPalWrapper>
      </LanguageProvider>
    </AuthProvider>
  </StrictMode>,
);
