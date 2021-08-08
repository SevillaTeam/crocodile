import { ISignInState } from '../components/LoginForm/redux-sagas/interfaces'
import { ISignUpReasonState } from '../components/SignUpForm/redux-sagas/interfaces'
import { IResponseUserState } from '@components/Profile/redux-sagas/interfaces';
import {RouterState} from "connected-react-router";
import {SagaMiddleware} from "redux-saga";
import { Store } from 'redux';

export interface IApplicationState {
  readonly user: IResponseUserState;
  readonly userTest: IResponseUserState;
  readonly signIn: ISignInState;
  readonly signUp: ISignUpReasonState;
}

export interface IAction<T> {
  type: string;
  payload: T;
}

export type AppStore = Store & {
  runSaga: SagaMiddleware['run'];
  close: () => void;
};

export interface State {
  user?: IResponseUserState;
  userTest?: IResponseUserState;
  readonly router: RouterState;
}
