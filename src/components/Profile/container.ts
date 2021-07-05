import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { IApplicationState } from '@/store/interfaces';
import { IResponseUserState, IUserAvatarState } from './redux-sagas/interfaces';

import * as actions from './redux-sagas/actions';
import * as selectors from './redux-sagas/selectors';

interface ISelection {
  userData: IResponseUserState;
  userAvatar: IUserAvatarState;
}

const mapStateToProps = createStructuredSelector<IApplicationState, ISelection>(
  {
    userData: selectors.userDataSelector,
    userAvatar: selectors.userAvatarSelector,
  },
);

const mapDispatchToProps = {
  getUserData: actions.getUserDataStart,
  changeUserAvatar: actions.changeUserAvatarStart,
  changeUserData: actions.changeUserDataStart,
};

export const connector = connect(mapStateToProps, mapDispatchToProps);
