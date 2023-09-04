import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { makeHome } from '../factories/pages/home-factory';

const Router = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={makeHome()} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
