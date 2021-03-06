import React, { useContext } from 'react';
import { Provider } from 'react-redux';
import { App } from './App';
import './styles/_reset.scss';
import './styles/_fonts.scss';
import './styles/_global.scss';
import { hydrate } from 'react-dom';
import 'babel-polyfill';
import { ConnectedRouter } from 'connected-react-router';
import { configureStore } from '@/store/rootStore';
import { State } from '@/store/interfaces';
import { changeUserLoggedInStatus } from '@components/Profile/redux-sagas/actions';

declare global {
  interface Window {
    __INITIAL_STATE__: State;
    // eslint-disable-next-line @typescript-eslint/ban-types
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: Function;
  }
}

const { store, history } = configureStore(window.__INITIAL_STATE__);
// @ts-ignore
delete window.__INITIAL_STATE__;

hydrate(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
