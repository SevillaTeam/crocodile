import { IAction } from '../../../../store/interfaces';
import { IResponseUserState } from '../interfaces';

export const changeIsLoggedInReducer = (
  state: IResponseUserState,
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
