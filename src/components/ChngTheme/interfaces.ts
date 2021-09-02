import { IApiClientResponse } from '../../services/interfaces';

export interface ChngThemeFormProps {
  userData: IApiClientResponse;
  onClose: () => void;
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
