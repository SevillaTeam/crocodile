import { IApiClientResponse } from '../../services/interfaces';
import { IResponseUserState, IUserAvatarState } from './redux-sagas/interfaces';

export interface IProfileProps {
  userData: IResponseUserState;
  userAvatar: IUserAvatarState;
  getUserData: () => void;
  changeUserAvatar: (data: IResponseUserState) => void;
  changeUserData: (data: IResponseUserState) => void;
  userDataState?: IApiClientResponse;
  setUserDataState?: React.Dispatch<React.SetStateAction<IApiClientResponse>>;
}

export interface IModalState {
  isModalOpen: boolean;
}
