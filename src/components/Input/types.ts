// import { FormEvent } from 'react';

export type OwnInputProps = {
  onChange: (value: string) => void;
  onBlur?: (value: string) => void;
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  value?: string;
  classNames?: Array<string>;
  helpMessage?: string;
  isError?: boolean;
  isRequired?: boolean;
  [propName: string]: unknown;
};

export interface IInputState {
  value: string;
}
