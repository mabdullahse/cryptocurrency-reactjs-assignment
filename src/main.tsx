import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter, RouterProvider, createBrowserRouter } from "react-router-dom";
import NotFound from './components/NotFound';
import CryptocurrencyDetail from './pages/cryptocurrencyDetail';
import Cryptocurrency from './pages/Cryptocurrency';

 

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "crypto",
        element: <Cryptocurrency />,
      },
      {
        path: "crypto/:id",
        element: <CryptocurrencyDetail />,
      },
    ],
  },
]);


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
