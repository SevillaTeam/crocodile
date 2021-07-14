import { IValues, IErrors, IFormState } from './interfaces';
import isEmail from 'validator/lib/isEmail';
import React from 'react';

export const validateField = (
  fieldName: string,
  value: string,
  formState: IFormState,
  setFormState: React.Dispatch<React.SetStateAction<IFormState>>,
): boolean => {
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

export const validateForm = (errors: IErrors, values: IValues): boolean => {
  if (haveErrors(errors)) {
    return false;
  } else if (!inputsHaveValues(values)) {
    return false;
  }

  return true;
};

export const haveErrors = (errors: IErrors): boolean => {
  let haveError = false;
  Object.keys(errors).map((key: string) => {
    if (errors[key].length > 0) {
      haveError = true;
    }
  });
  return haveError;
};

export const inputsHaveValues = (values: IValues) => {
  let hasValue = true;
  Object.keys(values).map((key: string) => {
    if (values[key] !== null) {
      if (!values[key].length) {
        hasValue = false;
        return hasValue;
      }
    }
  });
  return hasValue;
};
