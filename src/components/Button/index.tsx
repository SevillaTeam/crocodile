import React from 'react';
import s from './button.module.scss';
import { ButtonProps } from '@components/Button/types';

const Button: React.FC<ButtonProps> = ({
  onClick,
  type,
  styleType = 'text',
  size = 'standard',
  color = 'primary',
  disabled = false,
  text,
}) => (
  <button
    type={type}
    disabled={disabled}
    className={`${s.button} ${s[`button__${styleType}`]} ${
      s[`button__${size}`]
    } ${s[`button__${color}`]} ${s[`button__${disabled ? 'disabled' : ''}`]}`}
    onClick={onClick}
  >
    {text}
  </button>
);

export { Button };
