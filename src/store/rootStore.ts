import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createRootReducer} from './reducers/rootReducer';
import {createBrowserHistory, createMemoryHistory} from 'history';
import {State} from "./interfaces";
import rootSaga from './root-saga';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

export const isServer = !(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
);

export function configureStore(initialState: State, url = '/') {
    const history = isServer
        ? createMemoryHistory({initialEntries: [url]})
        : createBrowserHistory();

    const store = createStore(
        createRootReducer(),
        initialState,
        composeWithDevTools(applyMiddleware(...middlewares)),
    );

    sagaMiddleware.run(rootSaga);

    return {store, history};
}
