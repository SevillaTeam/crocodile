import {BrowserRouter} from 'react-router-dom';
import React from 'react';
import {Router} from './components/router';
import ErrorBoundary from "@app-components/ErrorBoundary";

interface Prop {
    num: number;
}

const App = (prop: Prop) => (
    <BrowserRouter>
        {/* надо обернуть в Layout когда он появится */}
        <ErrorBoundary>
            <Router/>
        </ErrorBoundary>
    </BrowserRouter>);


export {App};