import { combineReducers } from 'redux';
import userReducer from '../../components/Profile/redux-sagas/reducer';
import userTestReducer from '../../components/TestReduxComp/redux-saga/reducer';
import signInReducer from '../../components/LoginForm/redux-sagas/reducer'
import signUpReducer from '../../components/SignUpForm/redux-sagas/reducer'

export const createRootReducer = () =>
  combineReducers({
    user: userReducer,
    userTest: userTestReducer,
    signIn: signInReducer,
    signUp: signUpReducer
  });
