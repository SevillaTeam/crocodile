import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { App } from './App';
import './styles/_reset.scss';
import './styles/_fonts.scss';
import './styles/_global.scss';

import { configureStore } from './store';
import registerServiceWorker from './serviceWorkerRegistration'

process.env.MODE === 'production' && registerServiceWorker()

const store = configureStore({});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
