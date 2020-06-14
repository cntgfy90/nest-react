import { ThunkResult, IError } from './common.types';
import { IAppState } from '../reducers';

export interface IAuthRequest {
  login: string;
  password: string;
}

export type IRegisterData = IAuthRequest;
export type ILoginData = IAuthRequest;

export interface IAuthUser {
  id: number;
  username: string;
  createdAt: string;
  updatedAt: string;
}

export interface IAuthVerification extends IAuthUser {
  iet: string;
  exp: string;
}

export interface IAuthData {
  accessToken?: string;
  payload?: IAuthUser;
}

/**
 * Auth actions whuch are used in connected components directly.
 */
export interface IAuthOperations {
  register?: (registerData: IRegisterData) => ThunkResult<IAppState>;
  login?: (loginData: ILoginData) => ThunkResult<IAppState>;
  verify?: (accessToken: string) => ThunkResult<IAppState>;
}

export type IAuthError = IError;

export interface IAuthState {
  data: IAuthData;
  error?: IAuthError;
}

/**
 * Response from server on registration.
 */
export interface ISignUpResponse {
  success: boolean;
  message: string;
}
