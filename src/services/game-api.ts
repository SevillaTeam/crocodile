<<<<<<< HEAD
const baseUrl = 'https://sevilla-crocodile-6.ya-praktikum.tech/api';
=======
const baseUrl = 'https://sevilla-crocodile-6.ya-praktikum.tech:8081';
>>>>>>> 630a2d8fa2049821f523d494a776049bf436eed1

export const relayLocalDescriptions = (
  peerId: string,
  event: string,
  userId: string,
  data: RTCSessionDescriptionInit | RTCIceCandidate,
) => {
  return fetch(baseUrl + `/relay/${peerId}/${event}?user_id=${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

export const createUser = async (username: string): Promise<string> => {
  const res = await fetch(baseUrl + '/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
    }),
  });
  const userId = await res.json();
  return userId;
};

export const joinRoom = (roomId: string, userId: string) => {
  return fetch(baseUrl + `/api/${roomId}/join?user_id=${userId}`, {
    method: 'POST',
  });
};

export const postChatMessage = (message: {
  content: string;
  username: string;
}) => {
  return fetch(baseUrl + '/message', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
};
