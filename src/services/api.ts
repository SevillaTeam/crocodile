import { ApiClient } from './api-client';
import { IApiClientResponse } from './interfaces';
const apiBase = 'https://ya-praktikum.tech/api/v2';
const api = new ApiClient(apiBase);

export const getUserInfo = async (): Promise<IApiClientResponse> => {
  return await api.get({
    endpoint: '/auth/user',
  });
};

export const signUp = async (
  data: IApiClientResponse,
): Promise<IApiClientResponse> => {
  return await api.post({
    endpoint: '/auth/signup',
    data,
  });
};

export const logOut = async (): Promise<IApiClientResponse> => {
  return await api.post({
    endpoint: '/auth/logout',
  });
};
