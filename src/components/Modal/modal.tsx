import React, {FC} from 'react';
import {IModalState} from "@components/Modal/interfaces";


export const Modal: FC<IModalState> = (props) => {
    if (!props.isModalOpen) {
        return null
    } else {
        return (
            <div>{props.children}</div>
        )
    }
}
