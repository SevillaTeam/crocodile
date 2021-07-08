import { IAction } from '../../interfaces';
import { IResponseUserState } from '../interfaces';

const initState: IResponseUserState = {
  id: undefined,
};

export const changeUserIdReducer = (
  state: IResponseUserState = initState,
  action: IAction<IResponseUserState>,
): IResponseUserState => {
  const { payload } = action;

  if (payload) {
    const { id } = payload;

    if (id !== null || id !== undefined) {
      const newState = {
        ...state,
        id,
      };
      return newState;
    } else {
      return {
        ...state,
      };
    }
  }

  return {
    ...state,
  };
};
