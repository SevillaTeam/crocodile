import React, { ChangeEvent, FC, useState } from 'react';
import { OwnInputProps } from './';
import cn from 'classnames';
import s from './input.module.scss';

type Props = OwnInputProps;

export const Input: FC<Props> = (props) => {
  const {
    isError,
    helpMessage,
    name,
    type,
    placeholder,
    isRequired = false,
  } = props;
  const [inputValue, setInputValue] = useState({ value: '', name: '' });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { onChange } = props;
    setInputValue({ value: e.target.value, name: e.target.name });
    onChange({ value: e.target.value, name: e.target.name });
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement>): void => {
    const { onBlur } = props;
    if (onBlur) {
      setInputValue({ value: e.target.value, name: e.target.name });
      onBlur({ value: e.target.value, name: e.target.name });
    }
  };

  return (
    <div className={s.input}>
      <label className={s.label}>
        <input
          className={cn([s.htmlinput], {
            [s.htmlinput_error]: isError,
          })}
          name={name}
          type={type}
          required={isRequired}
          value={inputValue.value}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {placeholder && (
          <span
            className={cn([s.placeholder], {
              [s.placeholder_top]: inputValue.value,
            })}
          >
            {placeholder}
          </span>
        )}
      </label>
      {helpMessage && (
        <span
          className={cn([s.helpMessage], {
            [s.helpMessage_error]: isError,
          })}
        >
          {helpMessage}
        </span>
      )}
    </div>
  );
};
