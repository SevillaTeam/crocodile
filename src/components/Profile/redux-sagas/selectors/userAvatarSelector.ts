import { createSelector } from 'reselect';
import { IUserAvatarState } from '../interfaces';
import { IApplicationState } from '../../../../store/interfaces';
const getUserAvatar = (state: IApplicationState): IUserAvatarState =>
  state.user.avatar as IUserAvatarState;

export const userAvatarSelector = createSelector(
  getUserAvatar,
  (avatar) => avatar,
);
