import { ISignInState } from './redux-sagas/interfaces'

export interface ISignInFormProps {
  action?: string;
  signIn: (data: ISignInState) => void;
  signInReason: string;
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
