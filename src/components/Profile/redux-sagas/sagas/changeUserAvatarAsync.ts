import { takeLatest, call, put, all } from 'redux-saga/effects';

import * as api from '../../../../services/api';

import { changeUserAvatarSuccess, changeUserAvatarFailure } from '../actions';
import { IAction } from '@/store/interfaces';

import * as t from '../actionTypes';

import { IApiClientResponse } from '../../../../services/interfaces';

function* changeUserAvatarStart() {
  yield takeLatest(t.CHANGE_USER_AVATAR_START, changeUserAvatarAsync);
}

function* changeUserAvatarAsync(action: IAction<IApiClientResponse>) {
  try {
    const result: IApiClientResponse = yield api.chngUserAvatar(action.payload);
    yield put(changeUserAvatarSuccess(result));
  } catch (error) {
    yield put(changeUserAvatarFailure(error));
  }
}

export function* changeUserAvatarSagas() {
  yield all([call(changeUserAvatarStart)]);
}
