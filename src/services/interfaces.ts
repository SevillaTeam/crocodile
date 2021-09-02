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
  service_id?: string;
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
  name?: string;
}

export interface IRequestLiderboardAddUser {
  data: ILiderboardData;
  ratingFieldName: string;
  teamName?: string;
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

export interface IResponseLeaderboard {
  data?: {
    name?: string;
    score?: number;
    user_id?: number;
  }
}

export interface IOauth {
  code: string | undefined | null;
  redirect_uri: string;
}
