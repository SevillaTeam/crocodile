import React, { FormEvent, Component } from 'react';
import { Input } from '../Input';
import isEmail from 'validator/lib/isEmail';
import cn from 'classnames';
import s from './signup-form.module.scss';
import { getUserInfo, signUp, logOut } from '../../services';
import { IFormProps, IValues, IErrors, IFormState } from './interfaces';

export class SignUpForm extends Component<IFormProps, IFormState> {
  constructor(props: IFormProps) {
    super(props);

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

    this.state = {
      errors,
      values,
      message: '',
    };
  }

  private haveErrors(errors: IErrors) {
    let haveError = false;
    Object.keys(errors).map((key: string) => {
      if (errors[key].length > 0) {
        haveError = true;
      }
    });
    return haveError;
  }

  private inputsHaveValues(values: IValues) {
    let hasValue = true;
    Object.keys(values).map((key: string) => {
      if (!values[key].length) {
        hasValue = false;
        return hasValue;
      }
    });
    return hasValue;
  }

  private validateForm(errors: IErrors, values: IValues): boolean {
    if (this.haveErrors(errors)) {
      return false;
    } else if (!this.inputsHaveValues(values)) {
      return false;
    }

    return true;
  }

  private handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const data = this.state.values;

    signUp(data)
      .then((res) => {
        this.setState({ ...this.state, message: 'Успешно!' });
        console.log(res);
      })
      .catch((err) => {
        this.setState({ ...this.state, message: err.reason });
      });
  };

  private onChange = (e: FormEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const name = (e.target as HTMLInputElement).name;
    const value = (e.target as HTMLInputElement).value;

    this.setState(
      {
        ...this.state,
        values: { ...this.state.values, [name]: value },
      },
      () => {
        this.validateField(name, value);
      },
    );
  };

  private validateField(fieldName: string, value: string): boolean {
    const { errors, values } = this.state;
    const fieldValidationErrors = this.state.errors;

    const { password } = this.state.values;
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

    this.setState({ errors: fieldValidationErrors }, () =>
      this.validateForm(errors, values),
    );
    return true;
  }

  public render(): JSX.Element | React.ReactNode {
    const { errors, values, message } = this.state;
    return (
      <form className={s.form} onSubmit={this.handleSubmit}>
        <div>
          <div className={s.group}>
            <Input
              name='email'
              placeholder='Email'
              value={this.state.values.email}
              onChange={this.onChange}
              helpMessage={this.state.errors.email}
              isError={!!this.state.errors.email.length}
            />
          </div>
          <div className={s.group}>
            <Input
              name='login'
              placeholder='Login'
              value={this.state.values.login}
              onChange={this.onChange}
              helpMessage={this.state.errors.login}
              isError={!!this.state.errors.login.length}
            />
          </div>
          <div className={s.group}>
            <Input
              name='first_name'
              placeholder='Имя'
              value={this.state.values.first_name}
              onChange={this.onChange}
              helpMessage={this.state.errors.first_name}
              isError={!!this.state.errors.first_name.length}
            />
          </div>

          <div className={s.group}>
            <Input
              name='second_name'
              placeholder='Фамилия'
              value={this.state.values.second_name}
              onChange={this.onChange}
              helpMessage={this.state.errors.second_name}
              isError={!!this.state.errors.second_name.length}
            />
          </div>

          <div className={s.group}>
            <Input
              name='phone'
              placeholder='Телефон'
              value={this.state.values.phone}
              onChange={this.onChange}
              helpMessage={this.state.errors.phone}
              isError={!!this.state.errors.phone.length}
            />
          </div>

          <div className={s.group}>
            <Input
              name='password'
              placeholder='Пароль'
              type='password'
              value={this.state.values.password}
              onChange={this.onChange}
              helpMessage={this.state.errors.password}
              isError={!!this.state.errors.password.length}
            />
          </div>
          <div className={s.group}>
            <Input
              name='passwordConfirm'
              placeholder='Пароль повторно'
              type='password'
              value={this.state.values.passwordConfirm}
              onChange={this.onChange}
              helpMessage={this.state.errors.passwordConfirm}
              isError={!!this.state.errors.passwordConfirm.length}
            />
          </div>
          {<p className={s.message}>{message}</p>}

          <button
            type='submit'
            className=''
            disabled={!this.validateForm(errors, values)}
          >
            Зарегистрироваться
          </button>
        </div>
      </form>
    );
  }
}
