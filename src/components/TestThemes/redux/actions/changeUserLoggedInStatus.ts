import * as t from '../actionTypes';
import { IUserState } from '../interfaces';

export const changeUserLoggedInStatus = (data: IUserState) => {
  return {
    type: t.CHANGE_IS_LOGGED_IN_STATUS,
    payload: data,
  };
};
