import { Button } from '@/components/Button';
import { ForumCard } from '@/components/ForumCard';
import { Input } from '@/components/Input';
import { Modal } from '@/components/Modal';
import React, { useState } from 'react';
import s from './forum.module.scss';

export const Forum = (): JSX.Element => {
  const [modalState, setModalState] = useState({
    open: false
  })


  const toggleModal = () => {
      setModalState({
        open: !modalState.open
      });
  }

  const changeThemeText = () => {
    console.log('change theme text')
  }

  return (
    <main className={s.forum}>
      <Button onClick={toggleModal} className={s.forumButton} text="Создать тему" />
      <div className={s.forumCards}>
        <ForumCard
          className={s.forumCard}
          title="Тестовый тайтл"
          messagesCount={410}
          lastDate="сегодня в 14:00"
          topicId={1}
        />
      </div>
      <Modal className={s.forumModal} onClose={toggleModal} isModalOpen={modalState.open}>
        <Input className={s.modalInput} onChange={changeThemeText} name="Создать тему" />
        <Button className={s.modalButton} text="Создать" />
      </Modal>
    </main>
  );
};
