import { BrowserRouter } from 'react-router-dom';
import React from 'react';

import { Layout } from './components/Layout';
import { Router } from '@components/router';
import ErrorBoundary from '@components/ErrorBoundary';

const App = () => (
  <BrowserRouter>
    <ErrorBoundary>
      <Layout>
        <Router />
      </Layout>
    </ErrorBoundary>
  </BrowserRouter>
);

export { App };
