import { InputHTMLAttributes } from 'react';

export type OwnInputProps = {
  onChange?: (e: Event) => void;
  onFocus?: (e: Event) => void;
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  value?: string;
  classNames?: Array<string>;
  helpMessage?: string;
  isError?: boolean;
  [propName: string]: unknown;
} & InputHTMLAttributes<HTMLInputElement>;
