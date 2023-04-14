import React, { Suspense, lazy } from 'react';
import App from './App';
import './index.css';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import Loader from './components/Loader';


const NotFound = lazy(() => import('./components/NotFound'))
const CryptocurrencyDetail = lazy(() => import('./pages/cryptocurrencyDetail'))
const CryptocurrencyWrapper = lazy(() => import('./pages/CryptocurrencyWrapper'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <Suspense fallback={<Loader />}><App /></Suspense>,
    errorElement: <NotFound />,
    children: [
      {
        path: 'crypto',
        element: <CryptocurrencyWrapper />,
      },
      {
        path: 'crypto/:id',
        element: <CryptocurrencyDetail />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to='/crypto' replace />,
  },
]);
export default router;
