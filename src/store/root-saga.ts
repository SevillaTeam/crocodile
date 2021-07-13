import { all, call } from 'redux-saga/effects';

import { userDataSagas } from '../components/Profile/redux-sagas/sagas';
import { userDataTestSagas } from '../components/TestReduxComp/redux-saga/sagas';

export default function* rootSaga() {
  yield all([call(userDataSagas), call(userDataTestSagas)]);
}
