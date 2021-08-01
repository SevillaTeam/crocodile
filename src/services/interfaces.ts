export interface IApiClientResponse {
  id?: number;
  first_name?: string;
  second_name?: string;
  display_name?: string;
  login?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  reason?: string;
  formData?: FormData;
  oldPassword?: string;
  newPassword?: string;
}

export interface IRequestParams {
  endpoint: string;
  params?: Record<string, unknown>;
  data?: unknown;
  formData?: FormData;
  headers?: {
    [propName: string]: string;
  };
}

export interface ILiderboardData {
  user_id?: number;
  display_name?: string;
  score?: number;
  avatar?: string;
}

export interface IRequestLiderboardAddUser {
  data: ILiderboardData;
  ratingFieldName: string;
}

export interface IRequestLiderboardAll {
  ratingFieldName: string;
  cursor: number;
  limit: number;
}

export interface IResponseLiderboard {
  data?: ILiderboardData[];
  reason?: string;
}
