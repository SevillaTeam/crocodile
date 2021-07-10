import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { IApplicationState } from '@/store/interfaces';
import { IResponseUserState } from './redux-sagas/interfaces';

import * as selectors from './redux-sagas/selectors';
import * as actions from './redux-sagas/actions';

interface ISelection {
  signInReason: string;
}

const mapStateToProps = createStructuredSelector<IApplicationState, ISelection>(
  {
    signInReason: selectors.signInMessageSelector,
  },
);


const mapDispatchToProps = {
  signIn: actions.signInStart,
};

export const connector = connect(mapStateToProps, mapDispatchToProps);
