import { IApiClientResponse, IRequestParams } from './interfaces';

class ApiException extends Error {
  message: string;
  name: string;

  constructor(message: string) {
    super();
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
      let json = {};

      try {
        json = await res.json();
      } catch (e) {
        console.warn(`Error on api.delete reading body: ${e}`);
      }

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
        credentials: 'include',
        headers: this.headers,
        body: JSON.stringify(data),
        ...params,
      });
      let json = {};

      try {
        json = await res.json();
      } catch (e) {
        console.warn(`Error on api.put reading body: ${e}`);
      }

      if (!res.ok) {
        return Promise.reject(json);
      }
      return json;
    } catch (e) {
      console.error(`Error on api.put: ${e}`);
      throw new ApiException(e.message);
    }
  };

  putFormData = async ({
    endpoint,
    formData,
    params,
  }: IRequestParams): Promise<IApiClientResponse> => {
    try {
      const res = await fetch(`${this._apiBase}${endpoint}/`, {
        method: 'PUT',
        credentials: 'include',
        body: formData as FormData,
        ...params,
      });
      let json = {};

      try {
        json = await res.json();
      } catch (e) {
        console.warn(`Error on api.putFormData reading body: ${e}`);
      }

      if (!res.ok) {
        return Promise.reject(json);
      }
      return json;
    } catch (e) {
      console.error(`Error on api.putFormData: ${e}`);
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
