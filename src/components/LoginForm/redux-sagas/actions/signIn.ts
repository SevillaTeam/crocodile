import * as t from '../actionTypes';
import { IApiClientResponse } from '../../../../services/interfaces';

export const signInStart = (data: IApiClientResponse) => {
  return {
    type: t.SIGN_IN_START,
    payload: data,
  };
};

export const signInSuccess = (data: IApiClientResponse) => {
  return {
    type: t.SIGN_IN_SUCCESS,
    payload: data,
  };
};

export const signInFailure = (errorMessage: { reason: string }) => {
  return {
    type: t.SIGN_IN_FAILURE,
    payload: errorMessage,
  };
};
