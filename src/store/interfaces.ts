import { IResponseUserState } from '../components/Profile/redux-sagas/interfaces';

export interface IApplicationState {
  readonly user: IResponseUserState;
  readonly userTest: IResponseUserState;
}

export interface IAction<T> {
  type: string;
  payload: T;
}
