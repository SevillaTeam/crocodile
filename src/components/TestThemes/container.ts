import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { IApplicationState } from '@/store/interfaces';

import * as actions from './redux-saga/actions';
import * as selectors from './redux-saga/selectors';

interface ISelection {
  state: IApplicationState;
  userId?: number;
}

const mapStateToProps = createStructuredSelector<IApplicationState, ISelection>(
  {
    state: selectors.getStateSelector,
    userId: selectors.getUserIdSelector,
  },
);

const mapDispatchToProps = {
  changeUserId: actions.changeUserId,
  getUserData: actions.getUserDataStart,
};

export const connector = connect(mapStateToProps, mapDispatchToProps);
