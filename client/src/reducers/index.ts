import { combineReducers } from 'redux';
import authReducer, {
  INITIAL_STATE as AUTH_INITIAL_STATE,
} from './auth.reducer';
import postsReducer, {
  INITIAL_STATE as POSTS_INITIAL_STATE,
} from './posts.reducer';
import { IAuthAction, AUTH_ACTION_TYPES } from '../actions/auth';
import { IPostsAction } from '../actions/posts';
import { IAuthState } from '../types/auth.types';
import { IPostsState } from '../types/post.types';

export type ActionTypes = IAuthAction | IPostsAction;

export interface IAppState {
  auth: IAuthState;
  posts: IPostsState;
}

const INITIAL_STATE: IAppState = {
  auth: AUTH_INITIAL_STATE,
  posts: POSTS_INITIAL_STATE,
};

const appReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
});

export default (
  state: IAppState = INITIAL_STATE,
  action: ActionTypes
): IAppState => {
  if (action.type === AUTH_ACTION_TYPES.LOGOUT) {
    return INITIAL_STATE;
  }

  return appReducer(state, action);
};
