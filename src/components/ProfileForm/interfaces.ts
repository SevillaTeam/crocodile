import { IApiClientResponse } from '../../services/interfaces';

export interface IProfileFormProps {
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
