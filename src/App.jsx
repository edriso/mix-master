import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
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
import { action as newsletterAction } from './pages/Newsletter';

// Configure React Query with a 5-minute staleTime.
// By default, React Query considers cached data "stale" immediately and refetches
// on every window focus, component mount, or network reconnect.
// Setting staleTime to 5 minutes means cached data is considered "fresh" for that
// duration — React Query will serve the cached result without making a new network
// request. After 5 minutes, the data becomes "stale" and will be refetched on the
// next trigger (e.g. window refocus). This reduces unnecessary API calls while
// keeping data reasonably up-to-date.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

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
        loader: landingLoader,
        errorElement: <SinglePageError />,
      },
      {
        path: '/item/:id',
        element: <Item />,
        loader: singleItemLoader,
        errorElement: <SinglePageError />,
      },
      {
        path: '/newsletter',
        element: <Newsletter />,
        action: newsletterAction,
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
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default App;
