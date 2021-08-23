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
};

const userTestReducer = createReducer<IResponseUserState>(initState, {
  [t.CHANGE_USER_ID]: reducers.changeUserIdReducer,
  [t.GET_USER_DATA_FAILURE]: reducers.getUserDataFailure,
  [t.GET_USER_DATA_SUCCESS]: reducers.getUserDataSuccess,
});

export default userTestReducer;
