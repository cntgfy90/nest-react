import React from 'react';
import { CircularProgress } from '@material-ui/core';

export default function Loader(): JSX.Element {
  return (
    <CircularProgress
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    />
  );
}
