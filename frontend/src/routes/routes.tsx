import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import ErrorPage from '../pages/ErrorPage';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
  },
]);

export default routes;
