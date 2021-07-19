import React from 'react';
import { Provider } from 'react-redux';
import {App} from './App';
import './styles/_reset.scss';
import './styles/_fonts.scss';
import './styles/_global.scss';
import {hydrate} from "react-dom";
import 'babel-polyfill';
import { store } from './store';
import {Home} from "@/pages";

hydrate(
  // <React.StrictMode>
  //   <Provider store={store}>
            <Home />,
    // </Provider>
  // </React.StrictMode>,
  document.getElementById('root'),
);
