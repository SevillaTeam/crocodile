import { createSelector } from 'reselect';
import { IApplicationState } from '../../../../store/interfaces';
const getUserGameRole = (state: IApplicationState): string =>
  state.user.gameRole as string;

export const userGameRoleSelector = createSelector(
  getUserGameRole,
  (gameRole) => gameRole,
);
