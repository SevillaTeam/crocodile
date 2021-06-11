import React, { PureComponent } from 'react';
import { OwnInputProps } from './';
import cn from 'classnames';
import s from './input.module.scss';

type Props = OwnInputProps;

export class Input extends PureComponent<Props> {
  public render(): JSX.Element | React.ReactNode {
    const { labelText, id = 'inputId', ...props } = this.props;
    return (
      <div className={s.input}>
        <input className={s.input__htmlinput} {...props} id={id} />
        <label className={s.input__label} htmlFor={id}>
          {labelText ? labelText : ''}
        </label>
      </div>
    );
    // className={cn([s.checkbox__label])}
  }
}
