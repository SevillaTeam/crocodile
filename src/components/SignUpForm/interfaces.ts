import { ISignUpState } from './redux-sagas/interfaces'

export interface ISignUpFormProps {
  action?: string;
  signUp: (data: ISignUpState) => void;
  signUpReason: string;
}


export interface IFormProps {
  action?: string;
}

export interface IValues extends ISignUpState {
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
