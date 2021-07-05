import { IApiClientResponse } from '../../services/interfaces';
import { IResponseUserState } from '../Profile/redux-sagas/interfaces';

export interface IProfileFormProps {
  userData: IResponseUserState;
  getUserData: () => void;
  changeUserData: (data: IResponseUserState) => void;
  userDataState: IApiClientResponse;
  setUserDataState: React.Dispatch<React.SetStateAction<IApiClientResponse>>;
}

export interface IModalState {
  isModalOpen: boolean;
}

export interface IValues {
  [key: string]: string;
}

export interface IErrors {
  [key: string]: string;
}

export interface IValidFields {
  [key: string]: boolean;
}

export interface IFormState {
  values: IValues;
  errors: IErrors;
  message: string;
}
