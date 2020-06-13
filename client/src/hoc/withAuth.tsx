import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Loader from '../components/Loader';
import { IAuthVerifiction, IAuthData } from '../types/auth.types';
import store from '../store';
import { AUTH_ACTION_TYPES } from '../actions/auth';
import { LOCAL_STORAGE_AUTH } from '../constants';

export default function withAuth(ComponentToProtect: React.ComponentType) {
  return function ProtectedComponent(
    props: Record<string, unknown>
  ): JSX.Element {
    const [isLoading, setIsLoading] = useState(false);
    const [shouldRedirect, setShouldRedirect] = useState(false);

    useEffect(() => {
      setIsLoading(true);

      const { accessToken = '' } = store.getState().auth?.data;

      verify(accessToken).then((result = {}) => {
        setIsLoading(false);

        if (!result.accessToken) {
          localStorage.removeItem(LOCAL_STORAGE_AUTH);
          store.dispatch({ type: AUTH_ACTION_TYPES.LOGOUT });
          setShouldRedirect(true);
        }
      });
    }, []);

    async function verify(accessToken: string) {
      try {
        const params: { [key: string]: string } = {
          accessToken: accessToken,
        };

        const query = Object.keys(params)
          .map(
            (k: string) =>
              encodeURIComponent(k) + '=' + encodeURIComponent(params[k])
          )
          .join('&');

        const response = await fetch(
          `http://localhost:3000/verifyToken?${query}`
        );
        const result = await response.json();

        if (result?.message) {
          throw result;
        }

        const auth: IAuthData = {
          payload: result as IAuthVerifiction,
          accessToken: accessToken as string,
        };

        return auth;
      } catch (e) {
        return e;
      }
    }

    if (isLoading) {
      return <Loader />;
    }

    if (shouldRedirect) {
      return <Redirect to="/login" />;
    }

    return <ComponentToProtect {...props} />;
  };
}
