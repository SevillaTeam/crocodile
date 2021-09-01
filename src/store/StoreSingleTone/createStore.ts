import { StoreSingleTone } from './store-single-tone';
import { isEmpty } from './is-empty';

export function createStoreSingleTone(location?: string): StoreSingleTone {
  if (!StoreSingleTone._instance || isEmpty(StoreSingleTone._instance)) {
    StoreSingleTone._instance = new StoreSingleTone(location);
  }
  return StoreSingleTone._instance;
}
