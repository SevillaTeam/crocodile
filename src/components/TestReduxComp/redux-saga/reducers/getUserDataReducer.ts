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

export const getUserDataSuccess = (
  state: IResponseUserState = initState,
  action: IAction<IResponseUserState>,
): IResponseUserState => {
  const { payload } = action;

  if (payload) {
    return { ...state, ...payload };
  } else {
    return {
      ...state,
    };
  }
};

export const getUserDataFailure = (
  state: IResponseUserState = initState,
  action: IAction<IResponseUserState>,
): IResponseUserState => {
  const { payload } = action;

  if (payload) {
    return { ...payload };
  } else {
    return {
      ...state,
      reason: 'getUserDataFailure сработало!',
    };
  }
};
