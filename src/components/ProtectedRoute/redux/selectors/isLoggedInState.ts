import { createSelector } from 'reselect';
import { IApplicationState } from '@/store/interfaces';
const getIsLoggedInState = (state: IApplicationState) => state.user.isLoggedIn;

export const getIsLoggedInStateSelector = createSelector(
  getIsLoggedInState,
  (isLoggedIn) => isLoggedIn,
);
