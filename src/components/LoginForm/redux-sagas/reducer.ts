import * as t from './actionTypes';
import * as reducers from './reducers';
import createReducer from '../../../store/createReducer';
import { IResponseUserState } from './interfaces';

const initState = {
  login: '',
  password: ''
};

const userReducer = createReducer<IResponseUserState>(initState, {
  [t.SIGN_IN_SUCCESS]: reducers.signInSuccess,
  [t.SIGN_IN_FAILURE]: reducers.signInFailure,
});

export default userReducer;
