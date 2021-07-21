import React from 'react';
import s from './home.module.scss';
import * as Pages from '../../pages';
export const Home = (): JSX.Element => {
    return (
        <div className={s.homePage}>
            <Pages.Login />
        </div>
    );
};
