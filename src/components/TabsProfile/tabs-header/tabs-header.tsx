import React, { FC } from 'react';
import cn from 'classnames';
import { ITabsHeader } from './interfaces';
import s from './tabs-header.module.scss';

export const TabsHeader: FC<ITabsHeader> = ({
  list,
  handleClick,
  activeTab,
}) => {
  return (
    <div className={s.tabsHeader}>
      {list.map((item, index) => (
        <div
          className={cn(s.item, {
            [s.item_active]: activeTab === index,
          })}
          onClick={() => handleClick({ activeTab: index })}
          key={item}
        >
          {item}
        </div>
      ))}
    </div>
  );
};
