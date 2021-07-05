import { createSelector } from 'reselect';
import { IResponseUserState } from '../interfaces';
import { IApplicationState } from '../../../../store/interfaces';
const getUserData = (state: IApplicationState): IResponseUserState =>
  state.user;

export const userDataSelector = createSelector(
  getUserData,
  (userData) => userData,
);
