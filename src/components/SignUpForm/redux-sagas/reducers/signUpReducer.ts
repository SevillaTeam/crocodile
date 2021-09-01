import { IResponseUserState } from '../interfaces';
import { IAction } from '../../../../store/interfaces';

const initState = {
  email: '',
  login: '',
  first_name: '',
  second_name: '',
  phone: '',
  password: '',
  passwordConfirm: '',
};

export const signUpSuccess = (
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

export const signUpFailure = (
  state: IResponseUserState = initState,
  action: IAction<IResponseUserState>,
): IResponseUserState => {
  const { payload } = action;

  if (payload) {
    return { ...state, ...payload };
  } else {
    return {
      ...state,
      reason: 'signUpFailure сработало!',
    };
  }
};
