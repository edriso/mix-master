import { useQuery } from '@tanstack/react-query';
import { useLoaderData } from 'react-router-dom';
import axios from 'axios';
import CardList from '../components/CardList';
import SearchForm from '../components/SearchForm';

const itemsApiUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php';

const searchItemsQuery = (searchTerm) => {
  return {
    queryKey: ['search', searchTerm || 'lemon'],
    queryFn: async () => {
      searchTerm = searchTerm || 'lemon';

      const response = await axios.get(`${itemsApiUrl}?s=${searchTerm}`);
      return response.data.drinks || [];
    },
  };
};

// loader is not a hook, so we can't use a hook (useQuery) inside it
export const loader = (queryClient) => {
  return async ({ request }) => {
    // "new URL" is a built-in Web API.
    // It parses a URL string into an object with handy properties like
    // searchParams, pathname, hostname, etc.
    // Here we use it to extract query params from the request URL,
    // e.g. "/landing?search=milkshake" → url.searchParams.get('search') → "milkshake"
    const url = new URL(request.url);
    const searchTerm = url.searchParams.get('search') || 'lemon';
    
    // ensureQueryData checks if this query's data already exists in the cache.
    // If it does → returns cached data instantly (no network request).
    // If it doesn't → fetches the data and waits for it.
    // This guarantees the data is ready BEFORE the component mounts,
    // so the user sees content immediately with no loading spinner.
    await queryClient.ensureQueryData(searchItemsQuery(searchTerm));

    return {
      searchTerm,
    };
  };
};

const Landing = () => {
  const { searchTerm } = useLoaderData();
  const { data: items } = useQuery(searchItemsQuery(searchTerm));

  return (
    <>
      <SearchForm searchTerm={searchTerm} />
      <CardList items={items} />
    </>
  );
};
export default Landing;
