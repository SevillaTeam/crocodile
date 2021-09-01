import { IResponseUserState } from '../interfaces';
import { IAction } from '../../../../store/interfaces';

export const changeUserDataSuccess = (
  state: IResponseUserState,
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
  state: IResponseUserState,
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
