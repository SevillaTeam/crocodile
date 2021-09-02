import React, { useContext, useState } from 'react';
import { Layout } from '@components/Layout';
import ErrorBoundary from '@components/ErrorBoundary';
import { hot } from 'react-hot-loader/root';
import { Router } from '@/components/Router';
import { ThemeContext } from './context';

export const App = hot(() => {
  const [theme, setTheme] = useState('light');

  return (
    <ErrorBoundary>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Layout>
          <Router />
        </Layout>
      </ThemeContext.Provider>
    </ErrorBoundary>
  );
});
