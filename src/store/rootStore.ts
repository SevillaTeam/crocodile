import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createRootReducer } from '@/store/reducers';
import { createBrowserHistory, createMemoryHistory } from 'history';
import { AppStore, State } from './interfaces';
import rootSaga from './root-saga';
import { routerMiddleware } from 'connected-react-router';

function getComposeEnhancers() {
  if (process.env.NODE_ENV !== 'production' && !isServer) {
    return window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  }

  return compose;
}

export const isServer = !(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

export function configureStore(initialState: State, url = '/') {
  const history = isServer
    ? createMemoryHistory({ initialEntries: [url] })
    : createBrowserHistory();

  const sagaMiddleware = createSagaMiddleware();
  const composeEnhancers = getComposeEnhancers();
  const middlewares = [routerMiddleware(history), sagaMiddleware];

  const store = createStore(
    createRootReducer(history),
    // @ts-ignore
    initialState,
    composeEnhancers(applyMiddleware(...middlewares)),
  ) as AppStore;

  if (!isServer) {
    sagaMiddleware.run(rootSaga);
  }

  return { store, history };
}
