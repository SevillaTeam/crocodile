import {BrowserRouter} from 'react-router-dom';
import React from 'react';
import {Router} from './components/router';

interface Prop {
    num: number;
}

const App = (prop: Prop) => (
    <BrowserRouter>
        {/* надо обернуть в Layout когда он появится */}
        <Router/>
    </BrowserRouter>);
//torlorlo

export {App};

