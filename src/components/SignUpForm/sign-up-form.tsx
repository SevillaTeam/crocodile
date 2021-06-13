import React, { FC, FormEvent, Component } from 'react';
import { Input } from '../Input';
import isEmail from 'validator/lib/isEmail';
// import { OwnSignUpFormProps } from './index';
// import cn from 'classnames';
// import s from './input.module.scss';

// type Props = OwnSignUpFormProps;

//export const Users = (props) => {
// type Props = FC<OwnProps>;

// export const SignUpForm: FC<Props> = ({ children, ...otherProps }) => {
//   return <button>ПРивет мир!</button>;
// };

// import * as React from "react";

interface IFormProps {
  action?: string;
}

export interface IValues {
  [key: string]: string;
}

export interface IErrors {
  [key: string]: string;
}

export interface IValidFields {
  [key: string]: boolean;
}

export interface IFormState {
  values: IValues;
  errors: IErrors;
  // validFields: IValidFields;
  submitSuccess?: boolean;
}

export class SignUpForm extends Component<IFormProps, IFormState> {
  constructor(props: IFormProps) {
    super(props);

    const errors: IErrors = {
      email: '',
      login: '',
      first_name: '',
      second_name: '',
      display_name: '',
      password: '',
    };
    const values: IValues = {
      email: '',
      login: '',
      first_name: '',
      second_name: '',
      display_name: '',
      password: '',
    };
    // const validFields: IValidFields = {
    //   email: false,
    //   login: false,
    //   first_name: false,
    //   second_name: false,
    //   display_name: false,
    //   password: false,
    // };
    this.state = {
      errors,
      values,
      // validFields,
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

  // private handleSubmit = async (
  //   e: React.FormEvent<HTMLFormElement>
  // ): Promise<void> => {
  //   e.preventDefault();

  //   if (this.validateForm()) {
  //     const submitSuccess: boolean = await this.submitForm();
  //     this.setState({ submitSuccess });
  //   }
  // };

  private handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log('Event=', e.target);
    // if (this.validateForm()) {
    //   const submitSuccess: boolean = await this.submitForm();
    //   this.setState({ submitSuccess });
    // }
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

    // console.log('name= value=', name, value);

    // console.log('Event=', e.target);
    // if (this.validateForm()) {
    //   const submitSuccess: boolean = await this.submitForm();
    //   this.setState({ submitSuccess });
    // }
  };

  private validateForm(): boolean {
    // TODO - validate form
    return true;
  }

  private validateField(fieldName: string, value: string): boolean {
    // console.log('isEmail', isEmail(value));
    const fieldValidationErrors = this.state.errors;
    // const validFields = this.state.validFields;
    const { password } = this.state.values;
    switch (fieldName) {
      case 'email':
        fieldValidationErrors.email = isEmail(value)
          ? ''
          : 'Неверный формат Email';
        break;
      case 'password':
        fieldValidationErrors.password =
          value.length >= 4 ? '' : 'Пароль должен быть больше 4 знаков';
        break;
      case 'passwordConfirm':
        fieldValidationErrors.passwordConfirm =
          password === value ? '' : 'Пароли не совпадают';
        break;
      default:
        fieldValidationErrors[fieldName] =
          value.length >= 4 ? '' : 'Значение должно быть больше 4 знаков';
        break;
    }
    // if (fieldValidationErrors[fieldName].length) {
    //   validFields[fieldName] = false;
    // } else validFields[fieldName] = true;

    this.setState({ errors: fieldValidationErrors }, this.validateForm);
    return true;
  }

  private async submitForm(): Promise<boolean> {
    // TODO - submit the form
    return true;
  }

  public render() {
    const { submitSuccess, errors } = this.state;
    return (
      <form onSubmit={this.handleSubmit} noValidate={true}>
        <div className='container'>
          <Input
            name='email'
            value={this.state.values.email}
            onChange={this.onChange}
            helpMessage={this.state.errors.email}
            isError={!!this.state.errors.email.length}
          />

          <div className='form-group'>
            <button
              type='submit'
              className='btn btn-primary'
              disabled={this.haveErrors(errors)}
              onClick={(e) => console.log(this.state)}
            >
              Submit
            </button>
          </div>
          {submitSuccess && (
            <div className='alert alert-info' role='alert'>
              The form was successfully submitted!
            </div>
          )}
          {submitSuccess === false && !this.haveErrors(errors) && (
            <div className='alert alert-danger' role='alert'>
              Sorry, an unexpected error has occurred
            </div>
          )}
          {submitSuccess === false && this.haveErrors(errors) && (
            <div className='alert alert-danger' role='alert'>
              Sorry, the form is invalid. Please review, adjust and try again
            </div>
          )}
        </div>
      </form>
    );
  }
}
