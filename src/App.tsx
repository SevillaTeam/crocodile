import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { Router } from './components/router';
import { Layout } from './components/Layout';
import ErrorBoundary from '@app-components/ErrorBoundary';

interface Prop {
  num: number;
}

const App = (prop: Prop) => (
  <BrowserRouter>
    <ErrorBoundary>
      <Layout>
        <Router />
      </Layout>
    </ErrorBoundary>
  </BrowserRouter>
);

export { App };
