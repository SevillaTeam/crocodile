import * as t from '../actionTypes';
import { IResponseUserState } from '../interfaces';

export const getUserDataStart = () => {
  return {
    type: t.GET_USER_DATA_START,
<<<<<<< HEAD
=======
    payload: {},
>>>>>>> 20b363b (Добавил в README описание для контейнеров)
  };
};

export const getUserDataSuccess = (data: IResponseUserState) => {
  return {
    type: t.GET_USER_DATA_SUCCESS,
    payload: data,
  };
};

export const getUserDataFailure = (errorMessage: { reason: string }) => {
  return {
    type: t.GET_USER_DATA_FAILURE,
    payload: errorMessage,
  };
};
