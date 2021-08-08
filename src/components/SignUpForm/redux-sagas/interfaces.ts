import { IApiClientResponse } from '../../../services/interfaces';

export interface ISignUpState {
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  phone: string;
  password: string;
  passwordConfirm: string;
}

export interface ISignUpReasonState {
  reason: string;
}

export interface IUserState {
  readonly id?: number;
}

export interface IUserAvatarState {
  readonly avatar?: string;
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
  readonly message?: string;
}
