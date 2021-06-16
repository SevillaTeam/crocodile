import React, { FormEvent, FC, useState } from 'react';
import { Input, IInputState } from '../Input';
import s from './login-form.module.scss';
import cn from 'classnames';
import { signIn } from '../../services';
import { IFormProps, IValues, IErrors } from './interfaces';
import { Link } from 'react-router-dom';

export const LoginForm: FC<IFormProps> = (props) => {
  const errors: IErrors = {
    login: '',
    password: '',
  };
  const values: IValues = {
    login: '',
    password: '',
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
    signIn(data)
      .then(() => {
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

    switch (fieldName) {
      case 'password':
        fieldValidationErrors.password =
          value.length >= 3 ? '' : 'Пароль должен быть больше 3 знаков';
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
      <h1 className={s.title}>Вход</h1>
      <div>
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
            name='password'
            placeholder='Пароль'
            type='password'
            onChange={onChange}
            helpMessage={formState.errors.password}
            isError={!!formState.errors.password.length}
          />
        </div>

        {formState.message && <p className={s.message}>{formState.message}</p>}

        <div className={s.buttons}>
          <Button
            type='submit'
            disabled={!validateForm(formState.errors, formState.values)}
            text='Войти'
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
