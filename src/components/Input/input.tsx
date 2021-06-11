import React, { PureComponent, FormEvent } from 'react';
import { OwnInputProps } from './';
import cn from 'classnames';
import s from './input.module.scss';

type Props = OwnInputProps;

export class Input extends PureComponent<Props> {
  public render(): JSX.Element | React.ReactNode {
    const {
      isError,
      helpMessage,
      placeholder,
      onChange,
      onBlur,
      id = 'inputId',
      ...props
    } = this.props;

    return (
      <div className={s.input}>
        <label className={s.input__label}>
          <input
            className={cn([s.input__htmlinput], {
              [s.input__htmlinput_error]: isError,
            })}
            {...props}
            id={id}
            required
            placeholder=''
            onChange={(e: FormEvent<HTMLInputElement>) => {
              onChange ? onChange(e) : '';
            }}
            onBlur={(e: FormEvent<HTMLInputElement>) => {
              onBlur ? onBlur(e) : '';
            }}
          />
          <span className={s.input__placeholder}>{placeholder}</span>
        </label>
        <span
          className={cn([s.input__helpMessage], {
            [s.input__helpMessage_error]: isError,
          })}
        >
          {helpMessage}
        </span>
      </div>
    );
  }
}
