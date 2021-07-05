import { all, call } from 'redux-saga/effects';

import { userDataSagas } from './user/sagas';

export default function* rootSaga() {
  yield all([call(userDataSagas)]);
}
