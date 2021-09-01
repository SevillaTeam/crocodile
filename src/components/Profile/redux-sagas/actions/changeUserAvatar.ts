import * as t from '../actionTypes';
import { IApiClientResponse } from '../../../../services/interfaces';

export const changeUserAvatarStart = (data: IApiClientResponse) => {
  return {
    type: t.CHANGE_USER_AVATAR_START,
    payload: data,
  };
};

export const changeUserAvatarSuccess = (data: IApiClientResponse) => {
  return {
    type: t.CHANGE_USER_AVATAR_SUCCESS,
    payload: data,
  };
};

export const changeUserAvatarFailure = (errorMessage: { reason: string }) => {
  return {
    type: t.CHANGE_USER_AVATAR_FAILURE,
    payload: errorMessage,
  };
};
