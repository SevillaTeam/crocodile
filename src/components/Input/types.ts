import { InputHTMLAttributes, FormEvent } from 'react';

export type OwnInputProps = {
  onChange?: (e: FormEvent<HTMLInputElement>) => void;
  onFocus?: (e: FormEvent<HTMLInputElement>) => void;
  onBlur?: (e: FormEvent<HTMLInputElement>) => void;
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  value?: string;
  classNames?: Array<string>;
  helpMessage?: string;
  isError?: boolean;
  [propName: string]: unknown;
} & InputHTMLAttributes<HTMLInputElement>;
