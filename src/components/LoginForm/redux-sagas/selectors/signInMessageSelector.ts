import { createSelector } from 'reselect';
import { IResponseUserState } from '../interfaces';
import { IApplicationState } from '../../../../store/interfaces';
const getReasonMessage = (state: IApplicationState): string =>
  state.signIn.reason;

export const signInMessageSelector = createSelector(
  getReasonMessage,
  (reason) => reason,
);
