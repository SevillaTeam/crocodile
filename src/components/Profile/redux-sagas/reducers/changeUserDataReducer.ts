import { IResponseUserState } from '../interfaces';
import { IAction } from '../../../../store/interfaces';

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

export const changeUserDataSuccess = (
  state: IResponseUserState = initState,
  action: IAction<IResponseUserState>,
): IResponseUserState => {
  const { payload } = action;

  if (payload) {
    return { ...state, ...payload, message: 'Успешно!' };
  } else {
    return {
      ...state,
    };
  }
};

export const changeUserDataFailure = (
  state: IResponseUserState = initState,
  action: IAction<IResponseUserState>,
): IResponseUserState => {
  const { payload } = action;

  if (payload) {
    return { ...state, ...payload };
  } else {
    return {
      ...state,
      reason: 'changeUserDataFailure сработало!',
    };
  }
};
