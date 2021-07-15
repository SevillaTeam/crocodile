import React, {FC, useState} from "react";
import {Button} from "@components/Button";
import s from './start-game-banner.module.scss'
import {Modal} from "@components/Modal";

export const StartGameBanner: FC = () => {

    const [isOpen, setIsOpen] = useState(false)
    const [playerRole, setPlayerRole] = useState('')

    const toggleModal = () => {
        setIsOpen(!isOpen)
    }

    const setRole = (role: string) => {
        setPlayerRole(role)
        setIsOpen(false)
    }

    return (
        <div>
        <div className={s.banner}>
            <span className={s.header}>Онлайн игра</span>
            <span className={s.text}>Один рисует, остальные отгадывают в режиме реального времени.</span>
            <Button className={s.btn} styleType="contained" text={"Играть"} onClick={toggleModal}/>
        </div>
            <Modal isModalOpen={isOpen} onClose={toggleModal} >
                <div className={s.modalContainer}>
                    <span className={s.header}>В какой роли хотите играть?</span>
                    <div className={s.buttonsContainer}>
                    <Button className={s.btn} styleType="contained" text={"Рисовать"} onClick={() => {
                        setRole('draw')
                    }}/>
                    <Button className={s.btn} styleType="contained" text={"Отгадывать"} onClick={() => {
                        setRole('guess')
                    }}/>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
