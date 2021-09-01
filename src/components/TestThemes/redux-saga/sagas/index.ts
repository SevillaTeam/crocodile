import { call, all } from 'redux-saga/effects';
import { getUserDataSagas } from './getUserAsync';

export function* userDataTestSagas() {
  yield all([call(getUserDataSagas)]);
}
