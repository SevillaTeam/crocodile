import React, { FormEvent, FC, useState, useCallback, useEffect } from 'react';
import { Input, IInputState } from '../Input';
import { Button } from '../Button';
import s from './profile-form.module.scss';
import { IProfileFormProps, IValues, IErrors, IFormState } from './interfaces';
import { validateField, validateForm } from '../../utlis/form-validator';

export const ProfileForm: FC<IProfileFormProps> = (props) => {
  const { changeUserData, userData } = props;

  const errors: IErrors = {
    display_name: '',
    login: '',
    email: '',
  };
  const values: IValues = {
    display_name: '',
    login: '',
    email: '',
  };

  const [formState, setFormState] = useState<IFormState>({
    values,
    errors,
    message: userData.message || '',
  });

  useEffect(() => {
    const { display_name, login, email } = userData;
    memoOnChange({ name: 'display_name', value: display_name as string });
    memoOnChange({ name: 'login', value: login as string });
    memoOnChange({ name: 'email', value: email as string });
    setFormState((formState) => ({
      ...formState,
      message: userData.message || '',
    }));
  }, [userData]);

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
    const combinedData = { ...userData, ...data };
    changeUserData(combinedData);
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
      message: '',
    }));
    validateField(name, value, formState, setFormState);
  };

  return (
    <form className={s.form} onSubmit={memoHandleSubmit}>
      <div>
        <div className={s.group}>
          <Input
            name='display_name'
            placeholder='Отображаемое имя'
            startValue={userData.display_name}
            type='text'
            onChange={memoOnChange}
            helpMessage={formState.errors.display_name}
            isError={!!formState.errors.display_name.length}
          />
        </div>
        <div className={s.group}>
          <Input
            name='login'
            placeholder='Логин'
            startValue={userData.login}
            type='text'
            onChange={memoOnChange}
            helpMessage={formState.errors.login}
            isError={!!formState.errors.login.length}
          />
        </div>
        <div className={s.group}>
          <Input
            name='email'
            placeholder='Email'
            startValue={userData.email}
            type='email'
            onChange={memoOnChange}
            helpMessage={formState.errors.email}
            isError={!!formState.errors.email.length}
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
