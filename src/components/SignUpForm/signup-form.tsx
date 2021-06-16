import React, { FormEvent, FC, useState } from 'react';
import { Input, IInputState } from '../Input';
import { Button } from '../Button';
import isEmail from 'validator/lib/isEmail';
import cn from 'classnames';
import s from './signup-form.module.scss';
import { signUp } from '../../services';
import { IFormProps, IValues, IErrors } from './interfaces';
import { Link } from 'react-router-dom';

export const SignUpForm: FC<IFormProps> = (props) => {
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

  const [formState, setFormState] = useState({ values, errors, message: '' });

  const haveErrors = (errors: IErrors): boolean => {
    let haveError = false;
    Object.keys(errors).map((key: string) => {
      if (errors[key].length > 0) {
        haveError = true;
      }
    });
    return haveError;
  };

  const inputsHaveValues = (values: IValues) => {
    let hasValue = true;
    Object.keys(values).map((key: string) => {
      if (!values[key].length) {
        hasValue = false;
        return hasValue;
      }
    });
    return hasValue;
  };

  const validateForm = (errors: IErrors, values: IValues): boolean => {
    if (haveErrors(errors)) {
      return false;
    } else if (!inputsHaveValues(values)) {
      return false;
    }

    return true;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const data = formState.values;

    signUp(data)
      .then((res) => {
        setFormState((formState) => ({ ...formState, message: 'Успешно!' }));
      })
      .catch((err) => {
        setFormState((formState) => ({ ...formState, message: err.reason }));
      });
  };

  const onChange = ({ value, name }: IInputState): void => {
    setFormState((formState) => ({
      ...formState,
      values: { ...formState.values, [name]: value },
    }));
    validateField(name, value);
  };

  const validateField = (fieldName: string, value: string): boolean => {
    const fieldValidationErrors: IErrors = { ...formState.errors };

    const { values } = formState;
    const { password } = formState.values;
    switch (fieldName) {
      case 'email':
        fieldValidationErrors.email = isEmail(value)
          ? ''
          : 'Неверный формат Email';
        break;
      case 'password':
        fieldValidationErrors.password =
          value.length >= 3 ? '' : 'Пароль должен быть больше 3 знаков';
        break;
      case 'passwordConfirm':
        fieldValidationErrors.passwordConfirm =
          password === value ? '' : 'Пароли не совпадают';
        break;
      default:
        fieldValidationErrors[fieldName] =
          value.length >= 3 ? '' : 'Значение должно быть больше 3 знаков';
        break;
    }

    setFormState((formState) => ({
      ...formState,
      errors: fieldValidationErrors,
    }));

    validateForm(fieldValidationErrors, values);

    return true;
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <h1 className={s.title}>Регистрация</h1>
      <div>
        <div className={s.group}>
          <Input
            name='email'
            placeholder='Email'
            onChange={onChange}
            helpMessage={formState.errors.email}
            isError={!!formState.errors.email.length}
          />
        </div>
        <div className={s.group}>
          <Input
            name='login'
            placeholder='Login'
            onChange={onChange}
            helpMessage={formState.errors.login}
            isError={!!formState.errors.login.length}
          />
        </div>
        <div className={s.group}>
          <Input
            name='first_name'
            placeholder='Имя'
            onChange={onChange}
            helpMessage={formState.errors.first_name}
            isError={!!formState.errors.first_name.length}
          />
        </div>

        <div className={s.group}>
          <Input
            name='second_name'
            placeholder='Фамилия'
            onChange={onChange}
            helpMessage={formState.errors.second_name}
            isError={!!formState.errors.second_name.length}
          />
        </div>

        <div className={s.group}>
          <Input
            name='phone'
            placeholder='Телефон'
            onChange={onChange}
            helpMessage={formState.errors.phone}
            isError={!!formState.errors.phone.length}
          />
        </div>

        <div className={s.group}>
          <Input
            name='password'
            placeholder='Пароль'
            type='password'
            onChange={onChange}
            helpMessage={formState.errors.password}
            isError={!!formState.errors.password.length}
          />
        </div>
        <div className={s.group}>
          <Input
            name='passwordConfirm'
            placeholder='Пароль повторно'
            type='password'
            onChange={onChange}
            helpMessage={formState.errors.passwordConfirm}
            isError={!!formState.errors.passwordConfirm.length}
          />
        </div>
        {formState.message && <p className={s.message}>{formState.message}</p>}
        <div className={s.buttons}>
          <Button
            type='submit'
            disabled={!validateForm(formState.errors, formState.values)}
            text='Зарегистрироваться'
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
