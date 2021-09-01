import React, { ChangeEvent, FC, useState, useEffect } from 'react';
import { OwnInputProps } from './';
import cn from 'classnames';
import s from './input.module.scss';

type Props = OwnInputProps;

export const Input: FC<Props> = (props) => {
  const {
    isError,
    helpMessage,
    name,
    type = 'text',
    placeholder,
    isRequired = false,
    startValue = '',
  } = props;

  const [inputValue, setInputValue] = useState({ value: startValue, name: '' });

  useEffect(() => {
    setInputValue((inputValue) => ({ ...inputValue, value: startValue }));
  }, [startValue]);

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
    <div className={`${s.input} ${props.className}`}>
      <label className={s.label}>
        <input
          className={cn([s.htmlinput], {
            [s.htmlinput_error]: isError,
          })}
          type={type}
          name={name}
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
