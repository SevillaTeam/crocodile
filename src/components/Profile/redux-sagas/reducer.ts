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

const userReducer = createReducer<IResponseUserState>(initState, {
  [t.CHANGE_IS_LOGGED_IN_STATUS]: reducers.changeIsLoggedInReducer,
  [t.CHANGE_USER_GAME_ROLE]: reducers.changeUserGameRoleReducer,

  [t.GET_USER_DATA_FAILURE]: reducers.getUserDataFailure,
  [t.GET_USER_DATA_SUCCESS]: reducers.getUserDataSuccess,

  [t.CHANGE_USER_AVATAR_SUCCESS]: reducers.changeUserAvatarSuccess,
  [t.CHANGE_USER_AVATAR_FAILURE]: reducers.changeUserAvatarFailure,

  [t.CHANGE_USER_DATA_SUCCESS]: reducers.changeUserDataSuccess,
  [t.CHANGE_USER_DATA_FAILURE]: reducers.changeUserDataFailure,
});

export default userReducer;
