import React from 'react';
import s from './user.module.scss';
import { UserProps } from './types';
import Avatar from '../../assets/icons/avatar.svg';

const MiniUser: React.FC<UserProps> = (props) => (
  <div className={`${s.miniUser} ${props.className}`}>
    <img className={s.miniUserAvatar} src={Avatar} alt="user avatar" />
    <p className={s.miniUserName}>{props.name}</p>
  </div>
)

const FullUser: React.FC<UserProps> = (props) => (
  <div className={`${s.user} ${props.className}`}>
    <img className={s.userAvatar} src={Avatar} alt="user avatar" />
    <p className={s.userName}>{props.name}</p>
    {props.rating && <span className={s.userRating}>{props.rating} / 50 000</span>}
  </div>
)

const User: React.FC<UserProps> = (props) => (
  props.theme === 'mini' ?
    <MiniUser {...props} /> :
    <FullUser {...props} />
);

export { User };
