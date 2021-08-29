import { ApiClient } from './api-client';
import {
  IApiClientResponse,
  IRequestLiderboardAddUser,
  IRequestLiderboardAll,
  IResponseLiderboard,
  IOauth,
  IResponseLeaderboard,
} from './interfaces';
import { apiBase } from './constants';
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

export const signIn = async (
  data: IApiClientResponse,
): Promise<IApiClientResponse> => {
  return await api.post({
    endpoint: '/auth/signin',
    data,
  });
};

export const logOut = async (): Promise<IApiClientResponse> => {
  return await api.post({
    endpoint: '/auth/logout',
  });
};

export const changeUserProfile = async (
  data: IApiClientResponse,
): Promise<IApiClientResponse> => {
  return await api.put({
    endpoint: '/user/profile',
    data,
  });
};

export const chngUserAvatar = async (
  data: IApiClientResponse,
): Promise<IApiClientResponse> => {
  const { formData } = data;
  return await api.putFormData({
    endpoint: '/user/profile/avatar',
    formData,
  });
};

export const changePasswordRequest = async (
  data: IApiClientResponse,
): Promise<IApiClientResponse> => {
  return await api.put({
    endpoint: '/user/password',
    data,
  });
};

export const addToLeaderboard = async (
  data: IRequestLiderboardAddUser,
): Promise<IApiClientResponse | IResponseLiderboard> => {
  return await api.post({
    endpoint: '/leaderboard',
    data,
  });
};

export const getAllLeaderboard = async (
  data: IRequestLiderboardAll,
): Promise<IApiClientResponse | IResponseLiderboard | IResponseLeaderboard[]> => {
  return await api.post({
    endpoint: '/leaderboard/sevilla',
    data,
  });
};

export const getCodeForOAuth = async (
  searchParams: string,
): Promise<IApiClientResponse> => {
  return await api.get({
    endpoint: `/oauth/yandex/service-id?${searchParams}`,
  });
};

export const OAuthLogin = async (data: IOauth): Promise<IApiClientResponse> => {
  return await api.post({
    endpoint: '/oauth/yandex',
    data,
  });
};
