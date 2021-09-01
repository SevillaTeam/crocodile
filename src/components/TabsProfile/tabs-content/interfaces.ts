import { ReactNode } from 'react';

export interface ITabsContent {
  content: ReactNode;
}

export interface ITab {
  title: string;
  active: boolean;
  content: ReactNode;
}

export interface IActiveTab {
  activeTab: number;
}
