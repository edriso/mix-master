import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  HomeLayout,
  Landing,
  Newsletter,
  About,
  Item,
  Error,
  SinglePageError,
} from './pages';
import { loader as landingLoader } from './pages/Landing';
import { loader as singleItemLoader } from './pages/Item';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    hydrateFallbackElement: <p>Loading...</p>,
    children: [
      {
        index: true,
        element: <Landing />,
        errorElement: <SinglePageError />,
        loader: landingLoader,
      },
      {
        path: '/item/:id',
        loader: singleItemLoader,
        element: <Item />,
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
