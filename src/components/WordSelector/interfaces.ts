import { IApiClientResponse } from '../../services/interfaces';

export interface IAvatarChangerProps {
  action?: string;
  onClick?: (isModalOpen: boolean) => void;
  changeUserAvatar: (data: IApiClientResponse) => void;
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
  message: string;
}
