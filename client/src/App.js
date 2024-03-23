import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Home from './components/Home';
import AdminProfile from './components/AdminProfile';
import AllBooks from './components/AllBooks';
import ErrorPage from './components/ErrorPage';
import RootLayout from './components/RootLayout';
import UserBooks from './components/UserBooks';
import './App.css'


function App() {
  const browserRouter = createBrowserRouter([
    {
      path: '',
      element: <RootLayout  />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/home',
          element: <Home />,
        },
        {
          path: '/signup',
          element: <SignUp />,
        },
        {
          path: '/signin',
          element: <SignIn />,
        },
        {
          path: '/userbooks',
          element: <UserBooks />,
        },
        // {
        //   path: '/user-profile',
        //   element: <UserProfile />,
        // },
        {
          path: '/admin-profile',
          element: <AdminProfile />,
        },
        {
          path: '/allbooks',
          element: <AllBooks />,
        },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={browserRouter} />
    </div>
  );
}

export default App;
