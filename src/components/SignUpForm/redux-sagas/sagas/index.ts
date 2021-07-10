import { call, all } from 'redux-saga/effects';
import { signUp } from './signUpAsync';

export function* signUpSagas() {
  yield all([
    call(signUp),
  ]);
}
