import { createSelector } from 'reselect';
import { IUserGameRoleState } from '../interfaces';
import { IApplicationState } from '../../../../store/interfaces';
const getUserGameRole = (state: IApplicationState): IUserGameRoleState =>
  state.user.gameRole as IUserGameRoleState;

export const userGameRoleSelector = createSelector(
  getUserGameRole,
  (gameRole) => gameRole,
);
