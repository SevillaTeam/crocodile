import React, { FC, useState, useEffect, useCallback } from 'react';
import s from './profile.module.scss';
import { connector } from './container';
import { getUserInfo } from '../../services';
import { IProfileProps } from './interfaces';
import { AvatartProfile } from '@components/AvatarProfile';
import { AvatarChanger } from '@components/AvatarChanger';
import { Modal } from '@components/Modal';
import { IModalState } from './interfaces';
import { IApiClientResponse } from '../../services/interfaces';
import { ProfileForm } from '../ProfileForm';
import { TabsProfile } from '../TabsProfile';
import { ChngPwdForm } from '../ChngPwdForm';

const Profile: FC<IProfileProps> = (props) => {
  const {
    userData,
    getUserData,
    changeUserAvatar,
    userAvatar,
    changeUserData,
  } = props;
  const [modalState, setModalState] = useState<IModalState>({
    isModalOpen: false,
  });

  const [userDataState, setUserDataState] = useState<IApiClientResponse>({
    id: undefined,
    first_name: 'TestName',
    second_name: 'TestSecondName',
    display_name: '',
    login: '',
    email: '',
    phone: '+79653588098',
    avatar: '',
    reason: '',
  });

  const showModal = () => {
    setModalState((modalState) => ({
      ...modalState,
      isModalOpen: !modalState.isModalOpen,
    }));
  };

  const closeModal = () => {
    setModalState((modalState) => ({ ...modalState, isModalOpen: false }));
  };

  const memoCloseModal = useCallback(() => {
    closeModal();
  }, [modalState]);

  useEffect(() => {
    getUserData();
    getUserInfo()
      .then((res: IApiClientResponse) => {
        setUserDataState((userDataState) => ({
          ...userDataState,
          ...res,
        }));
      })
      .catch((err: { reason: string }) => {
        console.log(err);
      });
  }, []);

  const tabList = [
    {
      title: `Редактировать профиль`,
      active: true,
      content: (
        <ProfileForm
          userData={userData}
          getUserData={getUserData}
          changeUserData={changeUserData}
          userDataState={userDataState}
          setUserDataState={setUserDataState}
        />
      ),
    },
    {
      title: 'Изменить пароль',
      active: false,
      content: <ChngPwdForm />,
    },
  ];

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <AvatartProfile userAvatar={userAvatar} onClick={showModal} />

        <TabsProfile activeTab={0} tabList={tabList} />
      </div>
      <Modal onClose={memoCloseModal} isModalOpen={modalState.isModalOpen}>
        <AvatarChanger changeUserAvatar={changeUserAvatar} />
      </Modal>
    </div>
  );
};

export default connector(Profile);
