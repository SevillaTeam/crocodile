import React, { FC, useState } from 'react';
import { TabsHeader } from './tabs-header';
import { TabsContent } from './tabs-content';
import { IActiveTab, ITabsProfile } from './interfaces';

export const TabsProfile: FC<ITabsProfile> = (props) => {
  const { activeTab, tabList } = props;
  const [activeTabState, setActiveTabState] = useState<IActiveTab>({
    activeTab: activeTab || 0,
  });

  const getTabsTitles = () => tabList.map((item) => item.title);
  const tabsTitles = getTabsTitles();

  return (
    <div>
      <TabsHeader
        handleClick={setActiveTabState}
        list={tabsTitles}
        activeTab={activeTabState.activeTab}
      />
      <TabsContent content={tabList[activeTabState.activeTab].content} />
    </div>
  );
};
