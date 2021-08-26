import { IResponseUserState } from '../interfaces';
import { IAction } from '../../../../store/interfaces';

export const changeUserAvatarSuccess = (
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

export const changeUserAvatarFailure = (
  state: IResponseUserState,
  action: IAction<IResponseUserState>,
): IResponseUserState => {
  const { payload } = action;

  if (payload) {
    return { ...state, ...payload };
  } else {
    return {
      ...state,
      reason: 'changeUserAvatarFailure сработало!',
    };
  }
};
