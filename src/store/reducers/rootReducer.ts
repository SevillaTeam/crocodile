import { combineReducers } from 'redux';
import userReducer from '../../components/Profile/redux-sagas/reducer';
import userTestReducer from '../../components/TestReduxComp/redux-saga/reducer';
import signInReducer from '../../components/LoginForm/redux-sagas/reducer'
import signUpReducer from '../../components/SignUpForm/redux-sagas/reducer'
import {connectRouter} from "connected-react-router";
import {History} from 'history'

export const createRootReducer = (history: History) =>
  combineReducers({
    user: userReducer,
    userTest: userTestReducer,
    signIn: signInReducer,
    signUp: signUpReducer,
    router: connectRouter(history),
  });
