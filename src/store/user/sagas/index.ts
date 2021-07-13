import { call, all } from 'redux-saga/effects';
import { getUserDataSagas } from './getUserAsync';

export function* userDataSagas() {
  yield all([call(getUserDataSagas)]);
}
