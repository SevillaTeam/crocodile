import {combineReducers} from 'redux';
import userReducer from '../../components/Profile/redux-sagas/reducer';
import userTestReducer from '../../components/TestReduxComp/redux-saga/reducer';
import {connectRouter} from "connected-react-router";
import {History} from 'history'

export const createRootReducer = (history: History) =>
    combineReducers({
        user: userReducer,
        userTest: userTestReducer,
        router: connectRouter(history),
    });
