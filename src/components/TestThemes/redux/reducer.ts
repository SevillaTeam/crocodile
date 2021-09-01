import * as t from './actionTypes';
import * as reducers from './reducers';
import createReducer from '../../../store/createReducer';
import { IResponseUserState } from './interfaces';

const initState = {
  id: undefined,
  first_name: '',
  second_name: '',
  display_name: '',
  login: '',
  email: '',
  phone: '',
  avatar: '',
  reason: '',
  isLoggedIn: false,
};

const userIsLoggedInReducer = createReducer<IResponseUserState>(initState, {
  [t.CHANGE_IS_LOGGED_IN_STATUS]: reducers.changeIsLoggedInReducer,
});

export default userIsLoggedInReducer;
