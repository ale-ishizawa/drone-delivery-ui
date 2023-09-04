import React from 'react';
import Home from '../../../pages/Home';
import { makeRemoteLoadJson } from '../usecases/remote-load-json';

export const makeHome = (): JSX.Element => {
  return <Home loadJson={makeRemoteLoadJson()} />;
};
