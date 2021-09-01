import React, { FC } from 'react';
import { LayoutProps } from './';
import cn from 'classnames';
import s from './layout.module.scss';
import { Header } from '../Header';

type Props = LayoutProps;

export const Layout: FC<Props> = (props) => {
  const { children } = props;

  return (
    <div className={s.page}>
      <Header />
      <div className={s.main}>{children}</div>
    </div>
  );
};
