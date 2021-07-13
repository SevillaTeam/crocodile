import React, { FC } from 'react';
import { urlApiResources } from '../../services/constants';
import s from './avatar-profile.module.scss';
import { IAvatarProfileProps } from './interfaces';

export const AvatartProfile: FC<IAvatarProfileProps> = (props) => {
  const { onClick, userAvatar } = props;

  return (
    <div className={s.avatarCont}>
      {userAvatar && (
        <div
          className={s.avatar}
          style={{
            backgroundImage: `url(${urlApiResources}${userAvatar})`,
            backgroundSize: 'cover',
          }}
          onClick={() => onClick(true)}
        />
      )}
      {!userAvatar && (
        <div className={s.avatar} onClick={() => onClick(true)} />
      )}
    </div>
  );
};
