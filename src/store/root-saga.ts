import { all, call } from 'redux-saga/effects';

import { userDataSagas } from '../components/Profile/redux-sagas/sagas';
import { userDataTestSagas } from '../components/TestReduxComp/redux-saga/sagas';
import { signInSagas } from '../components/LoginForm/redux-sagas/sagas';
import { signUpSagas } from '../components/SignUpForm/redux-sagas/sagas';

export default function* rootSaga() {
  yield all([
    call(userDataSagas),
    call(userDataTestSagas),
    call(signInSagas),
    call(signUpSagas)
  ]);
}
