import { combineReducers } from 'redux';
import userReducer from '../../components/Profile/redux-sagas/reducer';
import userTestReducer from '../../components/TestReduxComp/redux-saga/reducer';

export const createRootReducer = () =>
  combineReducers({
    user: userReducer,
    userTest: userTestReducer,
  });
