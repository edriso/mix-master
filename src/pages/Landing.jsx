import { useLoaderData } from 'react-router-dom';
import axios from 'axios';
import CardList from '../components/CardList';

const dataSearchUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php';

export const loader = async () => {
  const searchTerm = 'lemon';
  const response = await axios.get(`${dataSearchUrl}?s=${searchTerm}`);

  return {
    items: response.data.drinks,
    searchTerm,
  };
};

const Landing = () => {
  const { items, searchTerm } = useLoaderData();

  return (
    <>
      <CardList items={items} />
    </>
  );
};
export default Landing;
