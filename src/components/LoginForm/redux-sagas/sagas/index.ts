import { call, all } from 'redux-saga/effects';
import { signIn } from './signInAsync';

export function* signInSagas() {
  yield all([
    call(signIn),
  ]);
}
