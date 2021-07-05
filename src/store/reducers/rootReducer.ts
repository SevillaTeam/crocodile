import { combineReducers } from 'redux';
import userReducer from '../user/reducer';

export const createRootReducer = () =>
  combineReducers({
    user: userReducer,
  });
