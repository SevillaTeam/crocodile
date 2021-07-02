import { IAction } from '../interfaces';
import { IUserState } from '../interfaces';

const initialState: IUserState = {
  id: 0,
};

export const testUserAction_1_Reducer = (
  state: IUserState = initialState,
  action: IAction<IUserState>,
): IUserState => {
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
