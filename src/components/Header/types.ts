import { IResponseUserState } from '../Profile/redux-sagas/interfaces';

export type HeaderProps = {
  theme?: string;
  userData?: IResponseUserState;
};

export interface IModalState {
  isModalOpen: boolean;
}
