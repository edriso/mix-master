import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  HomeLayout,
  Landing,
  Newsletter,
  About,
  Cocktail,
  Error,
} from './pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: '/cocktail',
        element: <Cocktail />,
      },
      {
        path: '/newsletter',
        element: <Newsletter />,
      },
      {
        path: '/about',
        element: <About />,
        // you can nest links as deep as needed // and add <Outlet /> inside About.jsx
        // children: [
        //   {
        //     index: true,
        //     element: <h2>About Company</h2>,
        //   },
        //   {
        //     path: '/Person',
        //     element: <h2>John Doe</h2>,
        //   },
        // ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
