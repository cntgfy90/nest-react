import { IPost, IPostsError } from '../types/post.types';
import { ThunkDispatch, ThunkResult } from '../types/common.types';

export enum POSTS_ACTION_TYPES {
  REQUEST = 'POSTS_REQUEST',
  SUCCESS = 'POSTS_SUCCESS',
  ERROR = 'POSTS_ERRORS',
}

export interface IPostsAction {
  type: POSTS_ACTION_TYPES;
  items?: IPost[];
  error?: IPostsError;
}

export const fetchPostsRequest = (): IPostsAction => ({
  type: POSTS_ACTION_TYPES.REQUEST,
});

export const fetchPostsSuccess = (items: IPost[] = []): IPostsAction => ({
  type: POSTS_ACTION_TYPES.SUCCESS,
  items,
});

export const fetchPostsError = (
  error: Record<string, string[]>
): IPostsAction => ({
  type: POSTS_ACTION_TYPES.ERROR,
  error: {
    messages:
      typeof error.message === 'string' ? [error.message] : [...error.messages],
  },
});

export default function fetchPosts(): ThunkResult<Promise<void>> {
  return async (dispatch: ThunkDispatch) => {
    try {
      dispatch(fetchPostsRequest());

      const response = await fetch(
        `${process.env.REACT_APP_DATA_API_URL}/posts`
      );
      const posts: IPost[] = await response.json();

      dispatch(fetchPostsSuccess(posts));
    } catch (e) {
      dispatch(fetchPostsError(e));
    }
  };
}
