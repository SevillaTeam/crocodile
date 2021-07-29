import { IAction } from '../../../../store/interfaces';
import { IResponseUserState } from '../interfaces';

const initState: IResponseUserState = {
  gameRole: '',
};

export const changeUserGameRoleReducer = (
  state: IResponseUserState = initState,
  action: IAction<IResponseUserState>,
): IResponseUserState => {
  const { payload } = action;

  if (payload) {
    const { gameRole } = payload;

    if (gameRole !== null || gameRole !== undefined) {
      const newState = {
        ...state,
        gameRole,
      };
      return newState;
    } else {
      return state;
    }
  }

  return state;
};
