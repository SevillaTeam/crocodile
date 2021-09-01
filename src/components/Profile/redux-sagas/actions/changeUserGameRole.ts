import * as t from '../actionTypes';
import { IUserGameRoleState } from '@components/GameCanvas/interfaces';

export const changeUserGameRole = (data: IUserGameRoleState) => {
  return {
    type: t.CHANGE_USER_GAME_ROLE,
    payload: data,
  };
};
