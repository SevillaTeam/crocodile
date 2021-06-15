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
        <label className={s.label}>
          <input
            className={cn([s.htmlinput], {
              [s.htmlinput_error]: isError,
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
          <span className={s.placeholder}>{placeholder}</span>
        </label>
        <p
          className={cn([s.helpMessage], {
            [s.helpMessage_error]: isError,
          })}
        >
          {helpMessage}
        </p>
      </div>
    );
  }
}
