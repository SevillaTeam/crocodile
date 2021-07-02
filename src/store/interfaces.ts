import { IUserState } from './user/interfaces';

export interface IApplicationState {
  readonly user: IUserState;
}
