import { call, all } from 'redux-saga/effects';
import { getUserDataSagas } from './getUserAsync';
import { changeUserAvatarSagas } from './changeUserAvatarAsync';
import { changeUserDataSagas } from './changeUserDataAsync';

export function* userDataSagas() {
  yield all([
    call(getUserDataSagas),
    call(changeUserAvatarSagas),
    call(changeUserDataSagas),
  ]);
}
