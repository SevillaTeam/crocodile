import { takeLatest, call, put, all } from 'redux-saga/effects';

import * as api from '../../../../services/api';

import { signUpSuccess, signUpFailure } from '../actions';
import { IAction } from '@/store/interfaces';

import * as t from '../actionTypes';

import { IApiClientResponse } from '../../../../services/interfaces';

function* signUpStart() {
  yield takeLatest(t.SIGN_UP_START, signUpAsync);
}

function* signUpAsync(action: IAction<IApiClientResponse>) {
  try {
    const result: IApiClientResponse = yield api.signUp(
      action.payload,
    );
    yield put(signUpSuccess(result));
  } catch (error) {
    yield put(signUpFailure(error as { reason: string }));
  }
}

export function* signUp() {
  yield all([call(signUpStart)]);
}
