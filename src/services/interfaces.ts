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
}
