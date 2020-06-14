import {
  IAuthData,
  IRegisterData,
  ILoginData,
  IAuthError,
  ISignUpResponse,
} from '../types/auth.types';
import { ThunkResult, ThunkDispatch } from '../types/common.types';
import { LOCAL_STORAGE_AUTH } from '../constants';

export enum AUTH_ACTION_TYPES {
  REQUEST = 'AUTH_REQUEST',
  SUCCESS = 'AUTH_SUCCESS',
  ERROR = 'AUTH_ERROR',
  LOGOUT = 'AUTH_LOGOUT',
}

export interface IAuthAction {
  data?: IAuthData;
  type: AUTH_ACTION_TYPES;
  error?: IAuthError;
}

export const authRequest = (): IAuthAction => ({
  type: AUTH_ACTION_TYPES.REQUEST,
});

export const authSuccess = (data: IAuthData = {}): IAuthAction => ({
  type: AUTH_ACTION_TYPES.SUCCESS,
  data,
});

export const logout = (): IAuthAction => ({
  type: AUTH_ACTION_TYPES.LOGOUT,
});

export const authError = (
  e: Record<string, string | string[]>
): IAuthAction => ({
  type: AUTH_ACTION_TYPES.ERROR,
  error: {
    messages: typeof e.message === 'string' ? [e.message] : [...e.message],
  },
});

export function login(loginData: ILoginData): ThunkResult<Promise<void>> {
  return async (dispatch: ThunkDispatch) => {
    try {
      dispatch(authRequest());

      const response = await fetch(
        `${process.env.REACT_APP_MAIN_API_URL}/login`,
        {
          method: 'POST',
          body: JSON.stringify(loginData),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
      const result = await response.json();

      if (result.statusCode) {
        throw result;
      }

      localStorage.setItem(LOCAL_STORAGE_AUTH, JSON.stringify(result));

      dispatch(authSuccess(result));
    } catch (e) {
      dispatch(authError(e));
    }
  };
}

export function register(
  registerData: IRegisterData
): ThunkResult<Promise<ISignUpResponse>> {
  return async (dispatch: ThunkDispatch) => {
    try {
      dispatch(authRequest());

      const response = await fetch(
        `${process.env.REACT_APP_MAIN_API_URL}/signup`,
        {
          method: 'POST',
          body: JSON.stringify(registerData),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
      const result = await response.json();

      if (result.error || result.statusCode) {
        throw result;
      }

      dispatch(authSuccess());

      return result;
    } catch (e) {
      dispatch(authError(e));
    }
  };
}
