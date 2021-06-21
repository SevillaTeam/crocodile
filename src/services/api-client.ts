import { IApiClientResponse, IRequestParams } from './interfaces';

class ApiException {
  message: string;
  name: string;

  constructor(message: string) {
    this.message = message;
    this.name = 'ApiException';
  }
}

type THeaders = {
  [propName: string]: string;
};

export class ApiClient {
  headers: THeaders;
  _apiBase: string;

  constructor(apiBase: string) {
    this.headers = {
      'Content-Type': 'application/json',
    };
    this._apiBase = apiBase;
  }

  get = async ({
    endpoint,
    params,
  }: IRequestParams): Promise<IApiClientResponse> => {
    try {
      const res = await fetch(`${this._apiBase}${endpoint}/`, {
        method: 'GET',
        credentials: 'include',
        headers: this.headers,
        ...params,
      });
      const json = await res.json();
      if (!res.ok) {
        return Promise.reject(json);
      }
      return json;
    } catch (e) {
      console.error(`Error on api.get: ${e}`);
      throw new ApiException(e.message);
    }
  };

  post = async ({
    endpoint,
    data,
    params,
  }: IRequestParams): Promise<IApiClientResponse> => {
    try {
      const res = await fetch(`${this._apiBase}${endpoint}/`, {
        method: 'POST',
        credentials: 'include',
        headers: this.headers,
        body: data ? JSON.stringify(data) : null,
        ...params,
      });
      let json = {};

      try {
        json = await res.json();
      } catch (e) {
        console.warn(`Error on api.post reading body: ${e}`);
      }

      if (!res.ok) {
        return Promise.reject(json);
      }
      return json;
    } catch (e) {
      console.error(`Error on api.post: ${e}`);
      throw new ApiException(e.message);
    }
  };

  delete = async ({
    endpoint,
    data,
    params,
  }: IRequestParams): Promise<IApiClientResponse> => {
    try {
      const res = await fetch(`${this._apiBase}${endpoint}/`, {
        method: 'DELETE',
        credentials: 'include',
        headers: this.headers,
        body: JSON.stringify(data),
        ...params,
      });
      const json = await res.json();

      if (!res.ok) {
        return Promise.reject(json);
      }
      return json;
    } catch (e) {
      console.error(`Error on api.delete: ${e}`);
      throw new ApiException(e.message);
    }
  };

  put = async ({
    endpoint,
    data,
    params,
  }: IRequestParams): Promise<IApiClientResponse> => {
    try {
      const res = await fetch(`${this._apiBase}${endpoint}/`, {
        method: 'PUT',
        headers: this.headers,
        body: JSON.stringify(data),
        ...params,
      });
      const json = await res.json();

      if (!res.ok) {
        return Promise.reject(json);
      }
      return json;
    } catch (e) {
      console.error(`Error on api.put: ${e}`);
      throw new ApiException(e.message);
    }
  };

  patch = async ({
    endpoint,
    data,
    params,
  }: IRequestParams): Promise<IApiClientResponse> => {
    try {
      const res = await fetch(`${this._apiBase}${endpoint}/`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify(data),
        ...params,
      });
      const json = await res.json();

      if (!res.ok) {
        return Promise.reject(json);
      }
      return json;
    } catch (e) {
      console.error(`Error on api.put: ${e}`);
      throw new ApiException(e.message);
    }
  };
}
