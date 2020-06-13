import { ThunkAction, ThunkDispatch as ReduxThunkDisaptch } from 'redux-thunk';
import { IAppState } from '../reducers';
import { Action, Store, AnyAction } from 'redux';

export interface IError {
  messages: string[];
}

export type IAppStore = Store<IAppState, AnyAction>;

export type ThunkResult<R> = ThunkAction<R, IAppStore, void, Action>;

export type ThunkDispatch = ReduxThunkDisaptch<IAppStore, void, Action>;
