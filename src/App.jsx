import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Login } from './components/auth/Login'
import { Home } from './components/Home'
import { Signup } from './components/auth/SignUp'
import { Jobs } from './components/Jobs'
import { Browse } from './components/Browse'
import { Profile } from './components/Profile'
import { JobDescription } from './components/JobDescription'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import axios from 'axios'
import { USER_API_END_POINT } from './utils/constant'
import { setUser } from './redux/authSlice'

function App() {

  const dispatch = useDispatch();

  useEffect(() => {

    const getUser = async () => {
      try {

        const res = await axios.get(
          `${USER_API_END_POINT}/me`,
          {
            withCredentials: true
          }
        );

        if (res.data.success) {
          dispatch(setUser(res.data.user));
        }

      } catch (error) {
        console.log("User not authenticated");
        console.log("Status:", error.response?.status);
        console.log("Message:", error.response?.data?.message);
        console.log("Error:", error.message);
      }
    };

    getUser();

  }, [dispatch]);

  const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/signup',
      element: <Signup />
    },
    {
      path: '/jobs',
      element: <Jobs />
    },
    {
      path: '/description/:id',
      element: <JobDescription />
    },
    {
      path: '/browse',
      element: <Browse />
    },
    {
      path: '/profile',
      element: <Profile />
    }
  ]);

  return (
    <RouterProvider router={appRouter} />
  );
}

export default App
