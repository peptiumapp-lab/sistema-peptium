import React from 'react';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { useLanguage } from '../contexts/LanguageContext';

export function PayPalWrapper({ children }: { children: React.ReactNode }) {
  const { language } = useLanguage();
  
  const currency = language === 'pt' ? 'BRL' : 'USD';
  
  const initialOptions = {
    clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID || "Adf50f_gX-YUxrh_aJY2NmRNRTDBtY54V8ME-riH9Yh330SkM7ft5Gahzj9KaEaj7hzDR5aCI8sIZV82",
    currency: currency,
    intent: "subscription",
    vault: true
  };

  return (
    <PayPalScriptProvider options={initialOptions} key={currency}>
      {children}
    </PayPalScriptProvider>
  );
}
