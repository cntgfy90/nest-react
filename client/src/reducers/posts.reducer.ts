import { IPostsState } from '../types/post.types';
import { POSTS_ACTION_TYPES, IPostsAction } from '../actions/posts';

export const INITIAL_STATE: IPostsState = {
  items: [],
  isLoaded: false,
};

export default function postsReducer(
  state: IPostsState = INITIAL_STATE,
  action: IPostsAction
): IPostsState {
  switch (action.type) {
    case POSTS_ACTION_TYPES.REQUEST:
      return {
        ...state,
        isLoaded: false,
      };
    case POSTS_ACTION_TYPES.SUCCESS:
      return {
        ...state,
        items: action.items ? [...action.items] : [...state.items],
        isLoaded: true,
      };
    case POSTS_ACTION_TYPES.ERROR:
      return {
        ...state,
        error: action.error,
        isLoaded: true,
      };
    default:
      return state;
  }
}
