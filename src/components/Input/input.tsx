import React, { PureComponent, ChangeEvent } from 'react';
import { OwnInputProps } from './';
import cn from 'classnames';
import s from './input.module.scss';

type Props = OwnInputProps;

export class Input extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    this.state = { value: '' };
  }

  //   onChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
  //     const newValue = e.target.value;
  //  }

  handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ value: e.target.value });
  };

  public render(): JSX.Element | React.ReactNode {
    const {
      isError,
      helpMessage,
      placeholder,
      onChange,
      onBlur,
      id = 'inputId',
      required,
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
            placeholder='123'
            value={this.state.value}
            onChange={this.handleChange}
            // onChange={(e: FormEvent<HTMLInputElement>) => {
            //   onChange ? onChange(e) : '';
            // }}
            // onBlur={(e: FormEvent<HTMLInputElement>) => {
            //   onBlur ? onBlur(e) : '';
            // }}
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
