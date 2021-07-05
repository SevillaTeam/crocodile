import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { IApplicationState } from '@/store/interfaces';

import * as actions from '../../store/user/actions';
import * as selectors from '../../store/user/selectors';

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
