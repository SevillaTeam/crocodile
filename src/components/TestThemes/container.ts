import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { IApplicationState } from '@/store/interfaces';

import * as actions from '@components/Profile/redux-sagas/actions';
import * as selectors from './redux-saga/selectors';

interface ISelection {
  state: IApplicationState;
}

const mapStateToProps = createStructuredSelector<IApplicationState, ISelection>(
  {
    state: selectors.getStateSelector,
  },
);

const mapDispatchToProps = {
  changeUserLoggedInStatus: actions.changeUserLoggedInStatus,
};

export const connector = connect(mapStateToProps, mapDispatchToProps);
