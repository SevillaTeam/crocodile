import { IResponseUserState } from '../interfaces';
import { IAction } from '../../../../store/interfaces';

const initState = {
  id: undefined,
  first_name: '',
  second_name: '',
  display_name: '',
  login: '',
  email: '',
  phone: '',
  avatar: '',
  reason: '',
};

export const getUserDataSuccess = (
  state: IResponseUserState = initState,
  action: IAction<IResponseUserState>,
): IResponseUserState => {
  const { payload } = action;
  const newData = notNullVlues(payload);

  if (payload) {
    return { ...state, ...newData, message: '' };
  } else {
    return {
      ...state,
    };
  }
};

export const getUserDataFailure = (
  state: IResponseUserState = initState,
  action: IAction<IResponseUserState>,
): IResponseUserState => {
  const { payload } = action;

  if (payload) {
    return { ...state, ...payload };
  } else {
    return {
      ...state,
      reason: 'getUserDataFailure сработало!',
    };
  }
};

export interface IResponseUserStateCopy extends IResponseUserState {
  id?: number;
  first_name?: string;
  second_name?: string;
  display_name?: string;
  login?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  reason?: string;
  message?: string;
}

const notNullVlues = (data: IResponseUserState): IResponseUserState => {
  const newData = { ...data } as IResponseUserStateCopy;
  (Object.keys(newData) as Array<keyof IResponseUserState>).forEach(
    <K extends keyof IResponseUserState>(key: K) => {
      if (newData[key] === null) {
        newData[key] = '' as typeof newData[typeof key];
      }
    },
  );
  return newData;
};
