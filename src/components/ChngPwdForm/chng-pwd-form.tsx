import React, { FormEvent, FC, useState, useCallback } from 'react';
import { Input, IInputState } from '../Input';
import { Button } from '../Button';
import s from './chng-pwd-form.module.scss';
import { changePasswordRequest } from '../../services';
import { IProfileFormProps, IValues, IErrors, IFormState } from './interfaces';
import { validateField, validateForm } from '../../utlis/form-validator';

export const ChngPwdForm: FC<IProfileFormProps> = () => {
  const errors: IErrors = {
    oldPassword: '',
    password: '',
    passwordConfirm: '',
  };
  const values: IValues = {
    oldPassword: '',
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
    [formState],
  );

  const handleSubmit = (
    e: FormEvent<HTMLFormElement>,
    formState: IFormState,
  ): void => {
    e.preventDefault();
    const data = formState.values;
    const combinedData = { ...data, newPassword: data.password };

    changePasswordRequest(combinedData)
      .then(() => {
        setFormState((formState) => ({ ...formState, message: 'Успешно!' }));
      })
      .catch((err) => {
        setFormState((formState) => ({ ...formState, message: err.reason }));
      });
  };

  const memoOnChange = useCallback(
    ({ value, name }: IInputState) => {
      onChange({ value, name }, formState, setFormState);
    },
    [formState],
  );

  const onChange = (
    { value, name }: IInputState,
    formState: IFormState,
    setFormState: React.Dispatch<React.SetStateAction<IFormState>>,
  ): void => {
    setFormState((formState) => ({
      ...formState,
      values: { ...formState.values, [name]: value },
    }));
    validateField(name, value, formState, setFormState);
  };

  return (
    <form className={s.form} onSubmit={memoHandleSubmit}>
      <div>
        <div className={s.group}>
          <Input
            name='oldPassword'
            placeholder='Пароль'
            startValue={formState.values.oldPassword}
            type='password'
            onChange={memoOnChange}
            helpMessage={formState.errors.oldPassword}
            isError={!!formState.errors.oldPassword.length}
          />
        </div>
        <div className={s.group}>
          <Input
            name='password'
            placeholder='Новый пароль'
            startValue={formState.values.password}
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
            startValue={formState.values.passwordConfirm}
            type='password'
            onChange={memoOnChange}
            helpMessage={formState.errors.passwordConfirm}
            isError={!!formState.errors.passwordConfirm.length}
          />
        </div>
      </div>
      <div className={s.groupErrAndBtn}>
        {formState.message && <p className={s.message}>{formState.message}</p>}
        <div className={s.buttons}>
          <Button
            type='submit'
            styleType='contained'
            size='dense'
            disabled={!validateForm(formState.errors, formState.values)}
            text='Изменить'
          />
        </div>
      </div>
    </form>
  );
};
