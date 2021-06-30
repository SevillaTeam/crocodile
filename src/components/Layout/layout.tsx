import React, { FC } from 'react';
import { LayoutProps } from './';
import cn from 'classnames';
import s from './layout.module.scss';

type Props = LayoutProps;

export const Layout: FC<Props> = (props) => {
  const { children } = props;

  return (
    <div className={s.page}>
      <div className={s.main}>{children}</div>
    </div>
  );
};
