import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import s from './home.module.scss';
import {Modal} from "@components/Modal";
import {Button} from "@components/Button";
import {IModalState} from "@components/Modal/interfaces";



export const Home = (): JSX.Element => {

    const [modalState, setModalState] = useState<IModalState>({
        isModalOpen: false,
    })

    const showModal = () => {
        console.log(123)
        setModalState((modalState) => ({ isModalOpen: !modalState.isModalOpen }));
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
      <Button text="Show modal" onClick={showModal}/>
      <Modal isModalOpen={modalState.isModalOpen}>
          easy breezy
      </Modal>
    </div>
  );
};
