import { ReactNode } from 'react';

export interface ITabsProfile {
  activeTab: number;
  tabList: ITab[];
  styles?: string[];
}

export interface ITab {
  title: string;
  active: boolean;
  content: ReactNode;
}

export interface IActiveTab {
  activeTab: number;
}

export interface IModalState {
  isModalOpen: boolean;
}

export interface IValues {
  [key: string]: string;
}

export interface IErrors {
  [key: string]: string;
}

export interface IValidFields {
  [key: string]: boolean;
}

export interface IFormState {
  values: IValues;
  errors: IErrors;
  message: string;
}
