import { FormEvent } from 'react';

export type OwnSignUpFormProps = {
  data?: {
    email?: 'string';
    login?: 'string';
    first_name?: 'string';
    second_name?: 'string';
    display_name?: 'string';
    phone?: 'string';
  };
  // handleSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  // onChange?: (e: Event) => void;
  // onFocus?: (e: Event) => void;
  // type?: 'text' | 'email' | 'password';
  // placeholder?: string;
  // value?: string;
  // classNames?: Array<string>;
  // helpMessage?: string;
  // isError?: boolean;
  [propName: string]: unknown;
};
// } & FormEvent<HTMLFormElement>;

// export type OwnSignUpFormProps = {
//   onChange?: (e: Event) => void;
//   onFocus?: (e: Event) => void;
//   type?: 'text' | 'email' | 'password';
//   placeholder?: string;
//   value?: string;
//   classNames?: Array<string>;
//   helpMessage?: string;
//   isError?: boolean;
//   [propName: string]: unknown;
// } & InputHTMLAttributes<HTMLInputElement>;
