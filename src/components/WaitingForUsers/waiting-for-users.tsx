import React, {FC} from "react";
import s from './waiting-for-users.module.scss'
import {IWaitingForUsersProps} from "@components/WaitingForUsers/interfaces";

export const WaitingForUsers: FC<IWaitingForUsersProps> = ({visible = false}: IWaitingForUsersProps) => {

    if (visible) {
        return (
            <div className={s.waitingForUsers}>
                <div className={`${s.spinner} ${s.spinnerCircle}`}></div>
                <h3>Ждем других игроков</h3>
            </div>
        )
    } else {
        return null
    }

}
