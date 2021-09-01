import { createSelector } from 'reselect';
import { IApplicationState } from '@/store/interfaces';
const getState = (state: IApplicationState) => state;

export const getStateSelector = createSelector(getState, (state) => state);
