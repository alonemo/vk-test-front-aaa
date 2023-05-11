import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './pages/Root/Root';
import ErrorPage from './pages/Error/Error';
import PostsPage from './pages/Posts/Posts';
import UserPage from './pages/User/User';
import FriendsPage from './pages/Friends/Friends';
import LoginPage from './pages/Login/Login';
import SignupPage from './pages/Signup/Signup';
import AllUsersPage from './pages/AllUsers/AllUsers';
import { loader as logoutAction } from './pages/Logout/Logout';
import { checkAuthLoader, isAuthLoader } from './utils/helper';
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <LoginPage />, loader: isAuthLoader },
      { path: 'signup', element: <SignupPage />, loader: isAuthLoader },
      {
        path: 'posts',
        element: <PostsPage />,
        loader: checkAuthLoader,
      },
      {
        path: ':userId',
        loader: checkAuthLoader,
        children: [
          {
            index: true,
            element: <UserPage />,
            loader: checkAuthLoader,
          },
          {
            path: 'friends',
            element: <FriendsPage />,
            loader: checkAuthLoader,
          },
          { path: 'users', element: <AllUsersPage />, loader: checkAuthLoader },
        ],
      },
      {
        path: 'logout',
        loader: logoutAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
