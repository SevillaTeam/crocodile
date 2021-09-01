import { configureStore } from '@/store/rootStore';
import { getInitialState } from '@/store/getInitialState';
import { AppStore, State } from '../interfaces';

export class StoreSingleTone {
  public store: any;
  static _instance = {} as StoreSingleTone;

  constructor(url = '/') {
    this.store = configureStore(getInitialState(url), url).store;
  }

  getStore = () => {
    return this.store;
  };
}
