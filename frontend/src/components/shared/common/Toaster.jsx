import React from 'react';
import { Toaster as HotToaster } from 'react-hot-toast';

export const Toaster = () => {
  return (
    <HotToaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: '#FAFAFA',
          color: '#424242',
          border: '1px solid #E0E0E0',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '500'
        },
        success: {
          iconTheme: {
            primary: '#4CAF50',
            secondary: '#FAFAFA',
          },
        },
        error: {
          iconTheme: {
            primary: '#F44336',
            secondary: '#FAFAFA',
          },
        },
      }}
    />
  );
};