import { useQuery } from '@tanstack/react-query';
import { useLoaderData } from 'react-router-dom';
import CardList from '../components/CardList';
import SearchForm from '../components/SearchForm';
import { searchItemsQuery } from '../utils/queries';

export const loader = (queryClient) => {
  return async ({ request }) => {
    const url = new URL(request.url);
    const searchTerm = url.searchParams.get('search') || 'lemon';

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
