import * as t from '../actionTypes';
import { IApiClientResponse } from '../../../services/interfaces';

export const getUserDataStart = () => {
  return {
    type: t.GET_USER_DATA_START,
    payload: {},
  };
};

export const getUserDataSuccess = (data: IApiClientResponse) => {
  return {
    type: t.GET_USER_DATA_SUCCESS,
    payload: data,
  };
};

export const getUserDataFailure = (errorMessage: { reason: string }) => {
  return {
    type: t.GET_USER_DATA_FAILURE,
    payload: errorMessage,
  };
};
