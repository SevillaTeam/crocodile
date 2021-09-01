import { createSelector } from 'reselect';
import { IApplicationState } from '@/store/interfaces';
const getUserId = (state: IApplicationState) => state.userTest.id;

export const getUserIdSelector = createSelector(getUserId, (id) => id);
