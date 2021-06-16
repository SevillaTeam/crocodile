import React, { FormEvent, Component } from 'react';
import { Input, IInputState } from '../Input';
import s from './login-form.module.scss';
import { getUserInfo, signUp, signIn, logOut } from '../../services';
import { IFormProps, IValues, IErrors, IFormState } from './interfaces';
// import { Link } from 'react-router-dom';

export class LoginForm extends Component<IFormProps, IFormState> {
  constructor(props: IFormProps) {
    super(props);

    const errors: IErrors = {
      login: '',
      password: '',
    };
    const values: IValues = {
      login: '',
      password: '',
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

    // logOut().then((res) => {
    // console.log(res);
    signIn(data)
      .then((res) => {
        this.setState({ ...this.state, message: 'Успешно!' });
        console.log(res);
      })
      .catch((err) => {
        this.setState({ ...this.state, message: err.reason });
      });
    // });
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
        <h1 className={s.title}>Вход</h1>
        <div>
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
              name='password'
              placeholder='Пароль'
              type='password'
              value={this.state.values.password}
              onChange={this.onChange}
              helpMessage={this.state.errors.password}
              isError={!!this.state.errors.password.length}
            />
          </div>

          {<p className={s.message}>{message}</p>}

          <button
            type='submit'
            className=''
            disabled={!this.validateForm(errors, values)}
          >
            Войти
          </button>
        </div>
      </form>
    );
  }
}
