import { combineReducers } from 'redux';
import { testUserAction_1_Reducer } from '../user/reducers';

export const createRootReducer = () =>
  combineReducers({
    user: testUserAction_1_Reducer,
  });
