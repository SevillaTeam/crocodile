import { IApiClientResponse } from '../../services/interfaces';

export interface IProfileProps {
  userDataState?: IApiClientResponse;
  setUserDataState?: React.Dispatch<React.SetStateAction<IApiClientResponse>>;
}

export interface IModalState {
  isModalOpen: boolean;
}
