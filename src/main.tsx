import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import {
  BrowserRouter,
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import NotFound from './components/NotFound';
import CryptocurrencyDetail from './pages/cryptocurrencyDetail';
import Cryptocurrency from './pages/Cryptocurrency';
import CryptocurrencyWrapper from './pages/CryptocurrencyWrapper';
import { CurrencyProvider } from '../src/store/CurrencyContext';

const router = createBrowserRouter([

  {
    path: '/',
    element: <App />,
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
    element: <Navigate to="/crypto" replace />
  },
  
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CurrencyProvider>
      <RouterProvider router={router} />
    </CurrencyProvider>
  </React.StrictMode>
);
