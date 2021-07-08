import { ApiClient } from './api-client';
import { IApiClientResponse } from './interfaces';
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

/*
    GAME API
 */

//TODO adapt the Api class

const baseUrl = 'http://localhost:8081'

export const relay = (peerId: string, event: string, token: string, data: RTCSessionDescriptionInit | RTCIceCandidate) => {
  return fetch(baseUrl + `/relay/${peerId}/${event}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
}

export const getToken = async (username: string): Promise<string> => {
  const res = await fetch(baseUrl + '/access', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username
    })
  });
  const token = await res.json();
  return token;
}


export const joinRoom = (roomId: string, token: string) => {
  return fetch(baseUrl + `/${roomId}/join`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
}

