import { IResponseUserState } from '../interfaces';
import { IAction } from '../../../../store/interfaces';

const initState = {
  login: '',
  password: ''
};

export const signInSuccess = (
  state: IResponseUserState = initState,
  action: IAction<IResponseUserState>,
): IResponseUserState => {
  const { payload } = action;

  if (payload) {
    return { ...state, ...payload, message: 'Успешно!' };
  } else {
    return state;
  }
};

export const signInFailure = (
  state: IResponseUserState = initState,
  action: IAction<IResponseUserState>,
): IResponseUserState => {
  const { payload } = action;

  if (payload) {
    return { ...state, ...payload };
  } else {
    return {
      ...state,
      reason: 'signInFailure сработало!',
    };
  }
};
