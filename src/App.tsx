import React from 'react';
import {Layout} from '@components/Layout';
import ErrorBoundary from '@components/ErrorBoundary';
import {hot} from "react-hot-loader/root";
import {Router} from "@components/Router";

export const App = () => (
    <ErrorBoundary>
        <Layout>
            <Router/>
        </Layout>
    </ErrorBoundary>
);

// export default hot(App);
// export default App;
