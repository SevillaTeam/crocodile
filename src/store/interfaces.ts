import { IResponseUserState } from '../components/Profile/redux-sagas/interfaces';
import { ISignInState } from '../components/LoginForm/redux-sagas/interfaces'
import { ISignUpReasonState } from '../components/SignUpForm/redux-sagas/interfaces'

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
