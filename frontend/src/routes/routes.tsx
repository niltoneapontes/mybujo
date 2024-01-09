import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import ErrorPage from '../pages/ErrorPage';
import Login from '../pages/Login';
import Monthly from '../pages/Monthly';
import Future from '../pages/Future';
import Collections from '../pages/Collections';
import Settings from '../pages/Settings';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/home',
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/monthly',
    element: <Monthly />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/future',
    element: <Future />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/collections',
    element: <Collections />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/settings',
    element: <Settings />,
    errorElement: <ErrorPage />,
  },
]);

export default routes;
