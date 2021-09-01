import { apiBase } from '../../services/constants';
import fetch from 'cross-fetch';
import { Request, Response, NextFunction } from 'express';
import { createStoreSingleTone } from '@/store/StoreSingleTone/createStore';
import { changeUserLoggedInStatus } from '@components/Profile/redux-sagas/actions';

const StoreSingleTone = createStoreSingleTone();
const store = StoreSingleTone.getStore();

export const checkAuthMiddlewareSSR = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { authCookie, uuid } = request.cookies;

  fetch(`${apiBase}/auth/user`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      accept: '*/*',
      cookie: `authCookie=${authCookie}; uuid=${uuid}`,
    },
  })
    .then((res) => {
      if (res.status >= 400) {
        store.dispatch(changeUserLoggedInStatus({ isLoggedIn: false }));

        next();
      }
      return res.json();
    })
    .then((user) => {
      if (user.id) {
        store.dispatch(changeUserLoggedInStatus({ isLoggedIn: true }));
        next();
      }
    })
    .catch((err) => {
      console.error(err);
      store.dispatch(changeUserLoggedInStatus({ isLoggedIn: false }));

      next();
    });
};
