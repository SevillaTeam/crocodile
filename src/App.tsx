import React from 'react';
import { Layout } from '@components/Layout';
import { Router } from '@components/Router';
import ErrorBoundary from '@components/ErrorBoundary';
import {hot} from "react-hot-loader/root";

export const App = () => (
    <ErrorBoundary>
      <Layout>
        <Router />
      </Layout>
    </ErrorBoundary>
);

// export default hot(App);
// export default App;
