import React, { FormEvent, FC, useState, useCallback } from 'react';
import { Input, IInputState } from '../Input';
import { Button } from '../Button';
import s from './login-form.module.scss';
import cn from 'classnames';
import { connector } from './container';
import { ISignInFormProps, IValues, IErrors, IFormState } from './interfaces';
import { Link } from 'react-router-dom';
import { validateField, validateForm } from '../../utlis/form-validator';

const LoginFormComponent: FC<ISignInFormProps> = (props) => {
  const { signIn, signInReason } = props
  const errors: IErrors = {
    login: '',
    password: '',
  };
  const values: IValues = {
    login: '',
    password: '',
  };

  const [formState, setFormState] = useState<IFormState>({
    values,
    errors,
    message: '',
  });

  const memoHandleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      handleSubmit(e, formState);
    },
    [formState]
  );

  const handleSubmit = (
    e: FormEvent<HTMLFormElement>,
    formState: IFormState
  ): void => {
    e.preventDefault();
    const data = formState.values;
    console.log(data)
    //@ts-ignore
    signIn(data)
  };

  const memoOnChange = useCallback(
    ({ value, name }: IInputState) => {
      onChange({ value, name }, formState, setFormState);
    },
    [formState]
  );

  const onChange = (
    { value, name }: IInputState,
    formState: IFormState,
    setFormState: React.Dispatch<React.SetStateAction<IFormState>>
  ): void => {
    setFormState((formState) => ({
      ...formState,
      values: { ...formState.values, [name]: value },
    }));
    validateField(name, value, formState, setFormState);
  };

  return (
    <form className={s.form} onSubmit={memoHandleSubmit}>
      <h1 className={s.title}>Вход</h1>
      <div>
        <div className={s.group}>
          <Input
            name='login'
            placeholder='Login'
            onChange={memoOnChange}
            helpMessage={formState.errors.login}
            isError={!!formState.errors.login.length}
          />
        </div>

        <div className={s.group}>
          <Input
            name='password'
            placeholder='Пароль'
            type='password'
            onChange={memoOnChange}
            helpMessage={formState.errors.password}
            isError={!!formState.errors.password.length}
          />
        </div>

        {signInReason && <p className={s.message}>{signInReason}</p>}

        <div className={s.buttons}>
          <Button
            type='submit'
            disabled={!validateForm(formState.errors, formState.values)}
            text='Войти'
            onClick={() => {console.log('fix me')}}
          />

          <Link
            to='/registration'
            className={cn([s.link], [s.link_standard], [s.link_primary])}
          >
            Зарегистрироваться
          </Link>
        </div>
      </div>
    </form>
  );
};

export const LoginForm = connector(LoginFormComponent) 