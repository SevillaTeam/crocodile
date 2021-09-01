import { IAction } from '../../../../store/interfaces';
import { IResponseUserState } from '../interfaces';

const initState: IResponseUserState = {
  isLoggedIn: false,
};

export const changeIsLoggedInReducer = (
  state: IResponseUserState = initState,
  action: IAction<IResponseUserState>,
): IResponseUserState => {
  const { payload } = action;

  if (payload) {
    const { isLoggedIn } = payload;

    if (isLoggedIn !== null || isLoggedIn !== undefined) {
      const newState = {
        ...state,
        isLoggedIn,
      };

      return newState;
    } else {
      return state;
    }
  }

  return state;
};
