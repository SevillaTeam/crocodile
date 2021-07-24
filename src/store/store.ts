import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createRootReducer } from './reducers/rootReducer';
import rootSaga from './root-saga';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];
const initialState = {};

const configureStore = (initialState = {}) => {
  const store = createStore(
    createRootReducer(),
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares)),
  );

  sagaMiddleware.run(rootSaga);

  return store;
};
const store = configureStore(initialState);

export { store, configureStore };
