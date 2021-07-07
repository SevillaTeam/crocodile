import React, { FC } from 'react';
import { ITabsContent } from './interfaces';
import s from './tabs-content.module.scss';

export const TabsContent: FC<ITabsContent> = ({ content }) => {
  return <div className={s.content}>{content}</div>;
};
