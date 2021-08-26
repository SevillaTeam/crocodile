import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { IApplicationState } from '@/store/interfaces';

import * as selectors from './redux/selectors';

interface ISelection {
  isLoggedIn?: boolean;
}

const mapStateToProps = createStructuredSelector<IApplicationState, ISelection>(
  {
    isLoggedIn: selectors.getIsLoggedInStateSelector,
  },
);

const mapDispatchToProps = {};

export const connector = connect(mapStateToProps, mapDispatchToProps);
