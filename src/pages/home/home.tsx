import React from 'react';
import s from './home.module.scss';
import {StartGameBanner} from "@components/StartGameBanner/start-game-banner";

export const Home = (): JSX.Element => {
  return (
      <div className={s.homePage}>
          <StartGameBanner />
      </div>
  );
};
