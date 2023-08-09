import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage.tsx';
import SongGamePage from './pages/SongGamePage.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import AddRecordPage from './pages/AddRecordPage.tsx';
import RecordsPage from './pages/RecordsPage.tsx';
import CharadesGamePage from './pages/CharadesGamePage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/playSongs',
    element: <SongGamePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/playCharades',
    element: <CharadesGamePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/add',
    element: <AddRecordPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/records',
    element: <RecordsPage />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
