export interface IValues {
  [key: string]: string;
}

export interface IErrors {
  [key: string]: string;
}

export interface IFormState {
  values: IValues;
  errors: IErrors;
  message: string;
}
