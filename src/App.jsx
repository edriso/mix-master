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

// 5-minute staleTime: cached data is served without refetching during this window
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
        loader: landingLoader(queryClient),
        errorElement: <SinglePageError />,
      },
      {
        path: '/item/:id',
        element: <Item />,
        loader: singleItemLoader(queryClient),
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
