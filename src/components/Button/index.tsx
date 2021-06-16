import React from "react";
import s from "./button.module.scss"
import {ButtonProps} from "@components/Button/types";

const Button: React.FC<ButtonProps> = ({
                                           onClick,
                                           type = 'text',
                                           size = 'standard',
                                           color = 'primary',
                                           disabled = false,
                                           text
                                       }) => (
    <button disabled={disabled}
            className={`${s.button} ${s[`button__${type}`]} ${s[`button__${size}`]} ${s[`button__${color}`]} ${s[`button__${disabled ? 'disabled' : ''}`]}`}
            onClick={onClick}>{text}</button>
)

export {Button}
