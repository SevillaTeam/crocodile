<<<<<<< HEAD
export type OwnInputProps = {
  onChange: ({ value, name }: IInputState) => void;
  onBlur?: ({ value, name }: IInputState) => void;
  type?: 'text' | 'email' | 'password';
  name: string;
=======
import { InputHTMLAttributes, FormEvent } from 'react';

export type OwnInputProps = {
  onChange?: (e: FormEvent<HTMLInputElement>) => void;
  onFocus?: (e: FormEvent<HTMLInputElement>) => void;
  onBlur?: (e: FormEvent<HTMLInputElement>) => void;
  type?: 'text' | 'email' | 'password';
>>>>>>> a7235568ce4396332d19e60e6c59418eaad1a826
  placeholder?: string;
  value?: string;
  classNames?: Array<string>;
  helpMessage?: string;
  isError?: boolean;
<<<<<<< HEAD
  isRequired?: boolean;
  [propName: string]: unknown;
};

export interface IInputState {
  value: string;
  name: string;
}
=======
  [propName: string]: unknown;
} & InputHTMLAttributes<HTMLInputElement>;
>>>>>>> a7235568ce4396332d19e60e6c59418eaad1a826
