import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import { createRootReducer } from './reducers/rootReducer';

export function configureStore(initialState = {}) {
  const store = createStore(
    createRootReducer(),
    initialState,
    devToolsEnhancer({}),
  );
  return store;
}
