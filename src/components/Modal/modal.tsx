import React, {FC} from 'react';
import {IModalState} from "@components/Modal/interfaces";
import s from './modal.module.scss'

export const Modal: FC<IModalState> = (props) => {

    const onClose = () => {
        props.onClose(false);
    }

    if (!props.isModalOpen) {
        return null
    } else {
        return (
            <div>
                <div className={`${s.modal} ${props.className}`}>
                    <div>{props.children}</div>
                </div>
                <div className={s.modalWrapper} onClick={onClose}></div>
            </div>
        )
    }
}
