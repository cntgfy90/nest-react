import { AUTH_ACTION_TYPES, IAuthAction } from '../actions/auth';
import { LOCAL_STORAGE_AUTH } from '../constants';
import { IAuthState } from '../types/auth.types';

export const INITIAL_STATE: IAuthState = {
  data: localStorage.getItem(LOCAL_STORAGE_AUTH)
    ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_AUTH) as string)
    : {},
};

export default function authReducer(
  state: IAuthState = INITIAL_STATE,
  action: IAuthAction
): IAuthState {
  switch (action.type) {
    case AUTH_ACTION_TYPES.REQUEST:
      return {
        ...state,
      };
    case AUTH_ACTION_TYPES.SUCCESS:
      return {
        data: { ...action.data },
      };
    case AUTH_ACTION_TYPES.ERROR:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}
