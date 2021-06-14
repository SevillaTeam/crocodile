import React from "react";
import s from "./button.module.scss"

interface ButtonProps {
    size?: string,
    type?: string,
    color?: string,
    disabled?: boolean,
    onClick: () => void
}


const Button: React.FC<ButtonProps> = ({
                                           onClick,
                                           type = 'text',
                                           size = 'standard',
                                           color = 'primary',
                                           disabled = false,
                                           children
                                       }) => (
    <button disabled={disabled}
            className={`${s.button} ${s[`button__${type}`]} ${s[`button__${size}`]} ${s[`button__${color}`]} ${s[`button__${disabled ? 'disabled' : ''}`]}`}
            onClick={onClick}>{children}</button>
)

export {Button}
