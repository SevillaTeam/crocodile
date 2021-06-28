import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import './styles/_reset.scss';
import './styles/_fonts.scss';
import './styles/_global.scss';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
