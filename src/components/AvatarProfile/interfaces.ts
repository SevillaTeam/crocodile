import { IApiClientResponse } from '../../services/interfaces';

export interface IAvatarProfileProps {
  userDataState: IApiClientResponse;
  setUserDataState: React.Dispatch<React.SetStateAction<IApiClientResponse>>;
  action?: string;
  onClick: (isModalOpen: boolean) => void;
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
