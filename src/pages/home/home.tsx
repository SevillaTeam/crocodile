import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import s from './home.module.scss';
import {Modal} from "@components/Modal";
import {Button} from "@components/Button";
import {IHomeState} from "@/pages/home/interfaces";


export const Home = (): JSX.Element => {

    const [homeState, setHomeState] = useState<IHomeState>({
        isModalOpen: false,
    })


    const showModal = () => {
        setHomeState((homeState) => ({isModalOpen: !homeState.isModalOpen}));
    }

    const closeModal = (isOpened: boolean) => {
        setHomeState((homeState) => ({isModalOpen: isOpened}));
    }


    return (
        <div className={s.homePage}>
            <h1 className={s.homePage__title}>Home page Croco</h1>
            <p className={s.homePage__description}>Здесь все будет... скоро</p>
            <Link className={s.homePage__link} to='/page-not-found'>
                Перейти на 404 страницу
            </Link>
            <Link className={s.homePage__link} to='/game'>
                Go to game page
            </Link>
            <Link className={s.homePage__link} to='/forum'>
                Go to forum page
            </Link>
            <Button text="Show modal" onClick={showModal}/>
            <Modal onClose={closeModal} isModalOpen={homeState.isModalOpen}>
                easy breezy
            </Modal>
        </div>
    );
};
