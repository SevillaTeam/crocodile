import React, { FC } from 'react';
import { IModalState } from '@components/Modal/interfaces';
import s from './modal.module.scss';

export const Modal: FC<IModalState> = (props) => {
  const onClose = () => {
    props.onClose();
  };

  if (!props.isModalOpen) {
    return null;
  } else {
    return (
      <div className={s.modalContent}>
        <div className={s.modalContentWrapper}>
          <div className={s.modal}>
            <div>{props.children}</div>
          </div>
          <div className={s.modalWrapper} onClick={onClose}></div>
        </div>
      </div>
    );
  }
};
