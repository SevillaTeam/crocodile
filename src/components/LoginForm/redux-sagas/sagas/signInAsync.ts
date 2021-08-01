import { takeLatest, call, put, all } from 'redux-saga/effects';

import * as api from '../../../../services/api';

import { signInSuccess, signInFailure } from '../actions';
import { IAction } from '@/store/interfaces';

import * as t from '../actionTypes';

import { IApiClientResponse } from '../../../../services/interfaces';

import { getUserDataStart } from '../../../Profile/redux-sagas/actions'

function* signInStart() {
  yield takeLatest(t.SIGN_IN_START, signInAsync);
}

function* signInAsync(action: IAction<IApiClientResponse>) {
  try {
    const result: IApiClientResponse = yield api.signIn(
      action.payload,
    );
    yield put(getUserDataStart())
    yield put(signInSuccess(result));
  } catch (error) {
    yield put(signInFailure(error as { reason: string }));
  }
}

export function* signIn() {
  yield all([call(signInStart)]);
}
