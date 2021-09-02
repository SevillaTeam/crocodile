import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { IApplicationState } from '@/store/interfaces';
import { IResponseUserState } from '../../components/Profile/redux-sagas/interfaces';

import { userDataSelector } from '../../components/Profile/redux-sagas/selectors'

interface ISelection {
  userData: IResponseUserState;
}

const mapStateToProps = createStructuredSelector<IApplicationState, ISelection>(
  {
    userData: userDataSelector,
  },
);
export const connector = connect(mapStateToProps);
