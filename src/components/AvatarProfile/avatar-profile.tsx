import React, { FC } from 'react';
import { urlApiResources } from '../../services/constants';
import s from './avatar-profile.module.scss';
import { IAvatarProfileProps } from './interfaces';

export const AvatartProfile: FC<IAvatarProfileProps> = (props) => {
  const { onClick, userDataState } = props;

  return (
    <div className={s.avatarCont}>
      {userDataState.avatar && (
        <div
          className={s.avatar}
          style={{
            backgroundImage: `url(${urlApiResources}${userDataState.avatar})`,
            backgroundSize: 'cover',
          }}
          onClick={() => onClick(true)}
        />
      )}
      {!userDataState.avatar && (
        <div className={s.avatar} onClick={() => onClick(true)} />
      )}
    </div>
  );
};
