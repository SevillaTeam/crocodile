import {
  CreateRequest,
  FindRequest,
  CreateRequestUserTheme,
  CreateUserRequest,
} from '../controllers/interface';

export const createSiteTheme = async (bodyToSend: CreateRequest) =>
  await fetch(`https://local.ya-praktikum.tech:5000/theme`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(bodyToSend),
  });

export const getSiteTheme = async (queryStr: string) =>
  await fetch(`https://local.ya-praktikum.tech:5000/theme${queryStr}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  });

export const createUserTheme = async (bodyToSend: CreateRequestUserTheme) =>
  await fetch(`https://local.ya-praktikum.tech:5000/theme/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(bodyToSend),
  });

export const getUserTheme = async (queryStr: string) =>
  await fetch(`https://local.ya-praktikum.tech:5000/theme/user${queryStr}`);

export const createUser = async (bodyToSend: CreateUserRequest) =>
  await fetch(`https://local.ya-praktikum.tech:5000/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(bodyToSend),
  });

export const getUser = async (queryStr: string) =>
  await fetch(`https://local.ya-praktikum.tech:5000/users${queryStr}`);
