import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { App } from './App';
import './styles/_reset.scss';
import './styles/_fonts.scss';
import './styles/_global.scss';

import { configureStore } from './store';
import { changeUserId } from './store/user/actions';

const store = configureStore({});

// console.log(store.getState());
// console.log(store.getState().user);

// store.dispatch(changeUserId({ id: 0 }));
// console.log(store.getState().user);

// store.dispatch(changeUserId({ id: 1 }));
// console.log(store.getState().user);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
