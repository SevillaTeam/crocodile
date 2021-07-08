import { IApiClientResponse } from '../../services/interfaces';

export interface IUserState {
  readonly id?: number;
}

export interface IResponseUserState extends IApiClientResponse {
  readonly id?: number;
  readonly first_name?: string;
  readonly second_name?: string;
  readonly display_name?: string;
  readonly login?: string;
  readonly email?: string;
  readonly phone?: string;
  readonly avatar?: string;
  readonly reason?: string;
}
