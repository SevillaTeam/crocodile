import { apiBase } from '../../services/constants';
import fetch from 'cross-fetch';
import { Request, Response, NextFunction } from 'express';

export const checkAuthMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { authCookie, uuid } = request.cookies;
  if (!authCookie || !uuid) {
    response.sendStatus(401);
  }

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
        response.sendStatus(401);
      }
      return res.json();
    })
    .then((user) => {
      if (user.id) next();
    })
    .catch((err) => {
      console.error(err);
      response.sendStatus(401);
    });
};
