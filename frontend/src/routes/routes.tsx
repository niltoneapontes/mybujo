import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import ErrorPage from '../pages/ErrorPage';
import Daily from '../pages/Daily';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/daily',
    element: <Daily />,
    errorElement: <ErrorPage />,
  },
]);

export default routes;
