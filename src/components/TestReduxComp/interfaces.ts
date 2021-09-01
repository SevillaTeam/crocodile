import { IUserState } from './redux-saga/interfaces';
import { IApplicationState } from '../../store/interfaces';

export interface ITestReduxCompProps {
  userId?: number | undefined;
  changeUserId: ({ id }: IUserState) => void;
  getUserData: () => void;
  state: IApplicationState;
}
