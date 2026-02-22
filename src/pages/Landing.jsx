import { useLoaderData } from 'react-router-dom';
import axios from 'axios';
import CardList from '../components/CardList';
import SearchForm from '../components/SearchForm';

const dataSearchUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php';

export const loader = async ({request}) => {
  // "new URL" is a built-in Web API.
  // It parses a URL string into an object with handy properties like
  // searchParams, pathname, hostname, etc.
  // Here we use it to extract query params from the request URL,
  // e.g. "/landing?search=milkshake" → url.searchParams.get('search') → "milkshake"
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get('search') || 'lemon';
  const response = await axios.get(`${dataSearchUrl}?s=${searchTerm}`);

  return {
    items: response.data.drinks || [],
    searchTerm,
  };
};

const Landing = () => {
  const { items, searchTerm } = useLoaderData();

  return (
    <>
      <SearchForm searchTerm={searchTerm} />
      <CardList items={items} />
    </>
  );
};
export default Landing;
