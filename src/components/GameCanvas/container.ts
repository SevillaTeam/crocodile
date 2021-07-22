import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { IApplicationState } from '@/store/interfaces';
import { IUserGameRoleState } from './redux-sagas/interfaces';

import * as selectors from './redux-sagas/selectors';

interface ISelection {
  gameRole: IUserGameRoleState;
}

const mapStateToProps = createStructuredSelector<IApplicationState, ISelection>(
  {
    gameRole: selectors.userGameRoleSelector,
  },
);

const mapDispatchToProps = {};

export const connector = connect(mapStateToProps, mapDispatchToProps);
