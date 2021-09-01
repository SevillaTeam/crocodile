import * as t from '../actionTypes';
import { IApiClientResponse } from '../../../../services/interfaces';

export const changeUserDataStart = (data: IApiClientResponse) => {
  return {
    type: t.CHANGE_USER_DATA_START,
    payload: data,
  };
};

export const changeUserDataSuccess = (data: IApiClientResponse) => {
  return {
    type: t.CHANGE_USER_DATA_SUCCESS,
    payload: data,
  };
};

export const changeUserDataFailure = (errorMessage: { reason: string }) => {
  return {
    type: t.CHANGE_USER_DATA_FAILURE,
    payload: errorMessage,
  };
};
