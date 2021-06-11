import React, { FormEvent, FC, useState, useCallback, useRef } from 'react';
import { Button } from '../Button';
import s from './avatar-changer.module.scss';
import { chngUserAvatar } from '../../services';
import { IAvatarChangerProps, IValues, IFormState } from './interfaces';
import { IApiClientResponse } from '../../services/interfaces';

export const AvatarChanger: FC<IAvatarChangerProps> = (props) => {
  const { userDataState, setUserDataState } = props;
  const fileInput = useRef<HTMLInputElement>(null);

  const values: IValues = {
    fileName: '',
  };

  const [formState, setFormState] = useState<IFormState>({
    values,
    message: '',
  });

  const memoHandleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      handleSubmit(e);
    },
    [formState],
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const file = fileInput?.current?.files?.[0] as string | Blob;
    const formData = new FormData();
    const fileNameOrig = fileInput?.current?.files?.[0].name;
    const freeSpacesName = fileNameOrig?.replace(/\s/g, '');
    formData.append('avatar', file, freeSpacesName);

    chngUserAvatar({ formData })
      .then((res: IApiClientResponse) => {
        if (res.avatar) {
          setUserDataState((userDataState) => ({
            ...userDataState,
            avatar: res.avatar as string,
          }));
        }

        if (fileNameOrig) {
          setFormState((formState) => ({
            ...formState,
            values: { fileName: fileNameOrig },
            message: 'Успешно!',
          }));
        }
      })
      .catch((err: { reason: string }) => {
        console.log(err);
        setFormState((formState) => ({ ...formState, message: err.reason }));
      });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const { name } = e?.currentTarget?.files![0];
      if (name) {
        setFormState((formState) => ({
          ...formState,
          values: { fileName: name },
        }));
      }
    } catch (err) {
      setFormState((formState) => ({ ...formState, values: { fileName: '' } }));
    }
  };

  return (
    <div className={s.container}>
      <form className={s.form} onSubmit={memoHandleSubmit}>
        <h1 className={s.title}>Загрузить файл</h1>
        <label htmlFor='file-input' className={s.label}>
          Выбрать файл на компьютере
        </label>
        <input
          className={s.input}
          name='file'
          id='file-input'
          type='file'
          ref={fileInput}
          accept='.png, .jpg, .jpeg'
          onChange={onChange}
        />
        <span className={s.error}>{formState.values.fileName}</span>
        <Button
          type='submit'
          styleType='contained'
          color='primary'
          text='Изменить'
          size='dense'
          disabled={!formState.values.fileName.length}
        />
      </form>
    </div>
  );
};
