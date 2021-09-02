import {
  CreateRequest,
  FindRequest,
  CreateRequestUserTheme,
  CreateUserRequest,
  DeleteRequest,
} from '../controllers/interface';

class ApiException extends Error {
  message: string;
  name: string;

  constructor(message: string) {
    super();
    this.message = message;
    this.name = 'ApiException';
  }
}

export const createSiteTheme = async (bodyToSend: CreateRequest) => {
  try {
    const response = await fetch(`https://local.ya-praktikum.tech:5000/theme`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(bodyToSend),
    });

    if (response.status >= 400)
      return Promise.reject('Ошибка сервера при создании темы сайта');

    let json: { reason?: string } = {};

    try {
      json = await response.json();
    } catch (e) {
      console.warn('Сервер не вернул данные темы при создании');
      return Promise.reject<{ reason?: string }>({
        reason: 'Сервер не вернул данные темы при создании',
      });
    }
    return json;
  } catch (e) {
    console.error(`Error on themes-api.createSiteTheme: ${e}`);
    throw new ApiException(e.message);
  }
};

export const createUserTheme = async (bodyToSend: CreateRequestUserTheme) => {
  try {
    const response = await fetch(
      `https://local.ya-praktikum.tech:5000/theme/user`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(bodyToSend),
      },
    );

    if (response.status >= 400)
      return Promise.reject('Ошибка сервера при создании темы пользователя');

    let json: { reason?: string } = {};

    try {
      json = await response.json();
    } catch (e) {
      console.warn('Сервер не вернул данные темы при создании');
      return Promise.reject<{ reason?: string }>({
        reason: 'Сервер не вернул данные темы при создании',
      });
    }
    return json;
  } catch (e) {
    console.error(`Error on themes-api.createUserTheme: ${e}`);
    throw new ApiException(e.message);
  }
};

export const deleteUserTheme = async (bodyToSend: DeleteRequest) => {
  try {
    const response = await fetch(
      `https://local.ya-praktikum.tech:5000/theme/user`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(bodyToSend),
      },
    );

    if (response.status >= 400)
      return Promise.reject('Ошибка сервера при удалении темы пользователя');

    let json: { reason?: string } = {};

    try {
      json = await response.json();
    } catch (e) {
      console.warn('Сервер не вернул данные темы при удалении');
      return Promise.reject<{ reason?: string }>({
        reason: 'Сервер не вернул данные темы при удалении',
      });
    }
    return json;
  } catch (e) {
    console.error(`Error on themes-api.deleteUserTheme: ${e}`);
    throw new ApiException(e.message);
  }
};

export const getUserTheme = async (queryStr: string) => {
  try {
    const response = await fetch(
      `https://local.ya-praktikum.tech:5000/theme/user${queryStr}`,
    );
    if (response.status >= 400)
      return Promise.reject('Ошибка сервера при запросе темы пользователя');

    let json: { reason?: string } = {};

    try {
      json = await response.json();
    } catch (e) {
      console.warn('Тема не существует');
      return Promise.resolve<{ reason?: string }>({
        reason: 'Тема не существует',
      });
    }
    return json;
  } catch (e) {
    console.error(`Error on themes-api.getUserTheme: ${e}`);
    throw new ApiException(e.message);
  }
};

export const getSiteThemeByOwnerId = async (queryStr: string) => {
  try {
    const response = await fetch(
      `https://local.ya-praktikum.tech:5000/theme${queryStr}`,
    );
    if (response.status >= 400)
      return Promise.reject('Ошибка сервера при запросе темы');

    let json: { reason?: string; theme?: string; [key: string]: unknown } = {};

    try {
      json = await response.json();
    } catch (e) {
      console.warn('Тема не существует');
      return Promise.resolve<{
        reason?: string;

        [key: string]: unknown;
      }>({
        reason: 'Тема не существует',
      });
    }
    return json;
  } catch (e) {
    console.error(`Error on themes-api.getSiteTheme: ${e}`);
    throw new ApiException(e.message);
  }
};

export const getSiteThemeByIdorTitle = async (queryStr: string) => {
  try {
    const response = await fetch(
      `https://local.ya-praktikum.tech:5000/theme/title${queryStr}`,
    );
    if (response.status >= 400)
      return Promise.reject('Ошибка сервера при запросе темы');

    let json: { reason?: string; [key: string]: unknown } = {};

    try {
      json = await response.json();
    } catch (e) {
      console.warn('Тема не существует');
      return Promise.resolve<{ reason?: string; [key: string]: unknown }>({
        reason: 'Тема не существует',
      });
    }
    return json;
  } catch (e) {
    console.error(`Error on themes-api.getSiteThemeByIdorTitle: ${e}`);
    throw new ApiException(e.message);
  }
};

export const createUser = async (bodyToSend: CreateUserRequest) => {
  try {
    const response = await fetch(`https://local.ya-praktikum.tech:5000/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(bodyToSend),
    });

    if (response.status >= 400)
      return Promise.reject('Ошибка сервера при создании пользователя');

    let json: { reason?: string } = {};

    try {
      json = await response.json();
    } catch (e) {
      console.warn('Сервер не вернул id пользователя при создании');
      return Promise.reject<{ reason?: string }>({
        reason: 'Сервер не вернул id пользователя при создании',
      });
    }
    return json;
  } catch (e) {
    console.error(`Error on themes-api.createUser: ${e}`);
    throw new ApiException(e.message);
  }
};

export const getUser = async (queryStr: string) => {
  try {
    const response = await fetch(
      `https://local.ya-praktikum.tech:5000/users${queryStr}`,
    );
    if (response.status >= 400)
      return Promise.reject('Ошибка сервера при запросе инфо пользователя');

    let json: { reason?: string } = {};

    try {
      json = await response.json();
    } catch (e) {
      console.warn('Пользователь не существует');
      return Promise.resolve<{ reason?: string }>({
        reason: 'Пользователь не существует',
      });
    }
    return json;
  } catch (e) {
    console.error(`Error on themes-api.getUser: ${e}`);
    throw new ApiException(e.message);
  }
};
