import * as t from '../actionTypes';
import { IUserState } from '../interfaces';

export const changeUserId = (data: IUserState) => {
  return {
    type: t.CHANGE_USER_ID,
    payload: data,
  };
};
