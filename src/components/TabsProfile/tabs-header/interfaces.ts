export interface ITabsHeader {
  activeTab: number;
  list: string[];
  handleClick: React.Dispatch<React.SetStateAction<IActiveTab>>;
}

export interface ITab {
  title: string;
  active: boolean;
  content: unknown;
}

export interface IActiveTab {
  activeTab: number;
}
