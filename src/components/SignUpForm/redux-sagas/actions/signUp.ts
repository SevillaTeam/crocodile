import * as t from '../actionTypes';
import { IApiClientResponse } from '../../../../services/interfaces';

export const signUpStart = (data: IApiClientResponse) => {
  return {
    type: t.SIGN_UP_START,
    payload: data,
  };
};

export const signUpSuccess = (data: IApiClientResponse) => {
  return {
    type: t.SIGN_UP_SUCCESS,
    payload: data,
  };
};

export const signUpFailure = (errorMessage: { reason: string }) => {
  return {
    type: t.SIGN_UP_FAILURE,
    payload: errorMessage,
  };
};
