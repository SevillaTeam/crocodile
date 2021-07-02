import { IUserState } from '../../store/user/interfaces';
import { IApplicationState } from '../../store/interfaces';

export interface ITestReduxCompProps {
  userId: number;
  changeUserId: ({ id }: IUserState) => void;
  state: IApplicationState;
}
