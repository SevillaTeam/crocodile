export interface IUserState {
  readonly id: number;
}

export interface IAction<T> {
  type: string;
  payload: T;
}
