import { IError } from './common.types';

export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export type IPostsError = IError;

export interface IPostsState {
  items: IPost[];
  error?: IPostsError;
  isLoaded: boolean;
}
