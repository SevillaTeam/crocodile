import { IUserAvatarState } from '../Profile/redux-sagas/interfaces';

export interface IAvatarProfileProps {
  userAvatar: IUserAvatarState;
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
