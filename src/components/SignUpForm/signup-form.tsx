import React, { FormEvent, FC, useState, useCallback } from 'react';
import { Input, IInputState } from '../Input';
import { Button } from '../Button';
import cn from 'classnames';
import s from './signup-form.module.scss';
import { connector } from './container';
import { ISignUpFormProps, IValues, IErrors, IFormState } from './interfaces';
import { Link } from 'react-router-dom';
import { validateField, validateForm } from '../../utlis/form-validator';

// [ ] - registration form to sagas
// [ ] - handle auth logic in redux
// [ ] - maybe refactor?

const SignUpFormComponent: FC<ISignUpFormProps> = (props) => {
  const {
    signUp,
    signUpReason
  } = props

  const errors: IErrors = {
    email: '',
    login: '',
    first_name: '',
    second_name: '',
    phone: '',
    password: '',
    passwordConfirm: '',
  };
  const values: IValues = {
    email: '',
    login: '',
    first_name: '',
    second_name: '',
    phone: '',
    password: '',
    passwordConfirm: '',
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

    signUp(data)
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
      values: { ...formState.values, [name]: value }
    }));
    // @ts-ignore
    validateField(name, value, formState, setFormState);
  };

  return (
    <form className={s.form} onSubmit={memoHandleSubmit}>
      <h1 className={s.title}>Регистрация</h1>
      <div>
        <div className={s.group}>
          <Input
            name='email'
            placeholder='Email'
            onChange={memoOnChange}
            helpMessage={formState.errors.email}
            isError={!!formState.errors.email.length}
          />
        </div>
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
            name='first_name'
            placeholder='Имя'
            onChange={memoOnChange}
            helpMessage={formState.errors.first_name}
            isError={!!formState.errors.first_name.length}
          />
        </div>

        <div className={s.group}>
          <Input
            name='second_name'
            placeholder='Фамилия'
            onChange={memoOnChange}
            helpMessage={formState.errors.second_name}
            isError={!!formState.errors.second_name.length}
          />
        </div>

        <div className={s.group}>
          <Input
            name='phone'
            placeholder='Телефон'
            onChange={memoOnChange}
            helpMessage={formState.errors.phone}
            isError={!!formState.errors.phone.length}
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
        <div className={s.group}>
          <Input
            name='passwordConfirm'
            placeholder='Пароль повторно'
            type='password'
            onChange={memoOnChange}
            helpMessage={formState.errors.passwordConfirm}
            isError={!!formState.errors.passwordConfirm.length}
          />
        </div>
        {signUpReason && <p className={s.message}>{signUpReason}</p>}
        <div className={s.buttons}>
          <Button
            type='submit'
            disabled={!validateForm(formState.errors, formState.values)}
            text='Зарегистрироваться'
            onClick={() => {console.log('fix me')}}
          />

          <Link
            to='/authorization'
            className={cn([s.link], [s.link_standard], [s.link_primary])}
          >
            Войти
          </Link>
        </div>
      </div>
    </form>
  );
};

export const SignUpForm = connector(SignUpFormComponent)