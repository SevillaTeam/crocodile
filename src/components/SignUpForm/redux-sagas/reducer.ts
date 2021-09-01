import * as t from './actionTypes';
import * as reducers from './reducers';
import createReducer from '../../../store/createReducer';
import { IResponseUserState } from './interfaces';

const initState = {
  email: '',
  login: '',
  first_name: '',
  second_name: '',
  phone: '',
  password: '',
  passwordConfirm: '',
};

const userReducer = createReducer<IResponseUserState>(initState, {
  [t.SIGN_UP_SUCCESS]: reducers.signUpSuccess,
  [t.SIGN_UP_FAILURE]: reducers.signUpFailure,
});

export default userReducer;
