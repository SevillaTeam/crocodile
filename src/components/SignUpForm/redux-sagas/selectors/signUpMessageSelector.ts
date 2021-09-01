import { createSelector } from 'reselect';
import { IResponseUserState } from '../interfaces';
import { IApplicationState } from '../../../../store/interfaces';
const getReasonMessage = (state: IApplicationState): string =>
  state.signUp.reason;

export const signUpMessageSelector = createSelector(
  getReasonMessage,
  (reason) => reason,
);
