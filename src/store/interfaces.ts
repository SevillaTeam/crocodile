import { IResponseUserState } from './user/interfaces';

export interface IApplicationState {
  readonly user: IResponseUserState;
}

export interface IAction<T> {
  type: string;
  payload: T;
}
