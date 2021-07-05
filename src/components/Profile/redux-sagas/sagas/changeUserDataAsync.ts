import { takeLatest, call, put, all } from 'redux-saga/effects';

import * as api from '../../../../services/api';

import { changeUserDataSuccess, changeUserDataFailure } from '../actions';
import { IAction } from '@/store/interfaces';

import * as t from '../actionTypes';

import { IApiClientResponse } from '../../../../services/interfaces';

function* changeUserDataStart() {
  yield takeLatest(t.CHANGE_USER_DATA_START, changeUserDataAsync);
}

function* changeUserDataAsync(action: IAction<IApiClientResponse>) {
  try {
    const result: IApiClientResponse = yield api.changeUserProfile(
      action.payload,
    );
    yield put(changeUserDataSuccess(result));
  } catch (error) {
    yield put(changeUserDataFailure(error));
  }
}

export function* changeUserDataSagas() {
  yield all([call(changeUserDataStart)]);
}
