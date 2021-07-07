export type OwnInputProps = {
  onChange: ({ value, name }: IInputState) => void;
  onBlur?: ({ value, name }: IInputState) => void;
  type?: 'text' | 'email' | 'password';
  name: string;
  id?: string;
  placeholder?: string;
  value?: string;
  classNames?: Array<string>;
  helpMessage?: string;
  isError?: boolean;
  isRequired?: boolean;
  [propName: string]: unknown;
  startValue?: string;
};

export interface IInputState {
  value: string;
  name: string;
}
