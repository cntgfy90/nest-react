import { IUser } from 'src/shared/common.types';

/**
 * Describes fields send to server.
 */
export interface IAuthRequest {
  login: string;
  password: string;
}

export type ILoginRequest = IAuthRequest;
export type IRegisterRequest = IAuthRequest;

export interface ITokenData {
  payload: Partial<IUser>;
  accessToken: string;
}

export interface IJWTPayload extends Partial<IUser> {
  iat?: number;
  expiresIn?: string;
}

export interface IRegisterResponse {
  user: IUser;
  accessToken: string;
}

export interface IRegisterStatus {
  success: boolean;
  message: string;
}
