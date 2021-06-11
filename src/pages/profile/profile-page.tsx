import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Profile } from '../../components/Profile';
import s from './profile-page.module.scss';

export const ProfilePage: FC = () => {
  return (
    <div className={s.profilePage}>
      <Profile />
    </div>
  );
};
