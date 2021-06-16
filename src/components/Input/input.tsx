import React, { PureComponent, ChangeEvent } from 'react';
import { OwnInputProps, IInputState } from './';
import cn from 'classnames';
import s from './input.module.scss';

type Props = OwnInputProps;

export class Input extends PureComponent<Props, IInputState> {
  constructor(props: Props) {
    super(props);
    this.state = { value: '' };
  }

  handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { onChange } = this.props;
    this.setState({ value: e.target.value }, () => {
      onChange(this.state.value);
    });
  };

  handleBlur = (e: ChangeEvent<HTMLInputElement>): void => {
    const { onBlur } = this.props;
    if (onBlur) {
      this.setState({ value: e.target.value }, () => {
        onBlur(this.state.value);
      });
    }
  };

  public render(): JSX.Element | React.ReactNode {
    const {
      isError,
      helpMessage,
      placeholder,
      isRequired = false,
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
            required={isRequired}
            value={this.state.value}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
          />
          {placeholder && (
            <span
              className={cn([s.placeholder], {
                [s.placeholder_top]: this.state.value,
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
  }
}
