export interface IUserGameRoleState {
  readonly gameRole: string;
}

export interface IBroadcastPayload {
  prevX: string;
  prevY: string;
  currX: string;
  currY: string;
  force?: string;
  color: string;
}
