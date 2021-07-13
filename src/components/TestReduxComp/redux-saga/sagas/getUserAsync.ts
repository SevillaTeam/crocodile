import { takeLatest, call, put, all } from 'redux-saga/effects';

import * as api from '../../../../services/api';

import { getUserDataSuccess, getUserDataFailure } from '../actions';

import * as t from '../actionTypes';

import { IResponseUserState } from '../interfaces';

function* getUserDataStart() {
  yield takeLatest(t.GET_USER_DATA_START, getUserDataAsync);
}

function* getUserDataAsync() {
  try {
    const result: IResponseUserState = yield api.getUserInfo();
    yield put(getUserDataSuccess(result));
  } catch (error) {
    yield put(getUserDataFailure(error));
  }
}

export function* getUserDataSagas() {
  yield all([call(getUserDataStart)]);
}
