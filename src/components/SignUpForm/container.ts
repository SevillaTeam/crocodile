import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { IApplicationState } from '@/store/interfaces';
import { IResponseUserState } from './redux-sagas/interfaces';

import * as selectors from './redux-sagas/selectors';
import * as actions from './redux-sagas/actions';

interface ISelection {
  signUpReason: string;
}

const mapStateToProps = createStructuredSelector<IApplicationState, ISelection>(
  {
    signUpReason: selectors.signUpMessageSelector,
  },
);


const mapDispatchToProps = {
  signUp: actions.signUpStart,
};

export const connector = connect(mapStateToProps, mapDispatchToProps);
