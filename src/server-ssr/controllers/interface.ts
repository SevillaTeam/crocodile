export abstract class BaseRESTService {
  abstract request?: (...args: any[]) => Promise<any>;
  abstract create?: (...args: any[]) => Promise<any>;
  abstract update?: (...args: any[]) => Promise<any>;
  abstract delete?: (...args: any[]) => Promise<any>;
  abstract find?: (...args: any[]) => Promise<any>;
  abstract findAll?: (...args: any[]) => Promise<any>;
}

export interface FindRequest {
  id?: number; // ID темы в таблице
  ownerId?: number; // ID владельца темы
  title?: string; // Поиск по частичному совпадению в таблице
  theme?: string;
}

export interface DeleteRequest {
  ownerId?: number;
}

export interface CreateRequest {
  theme: string;
  description: string;
}

export interface CreateUserRequest {
  id: number;
}

export interface CreateRequestUserTheme {
  theme?: string;
  themeId?: number;
  ownerId?: number;
}

export interface ExpressRequestModeledType {
  [key: string]: any;
}

export interface ExpressResponseModeledType {
  [key: string]: any;
}
