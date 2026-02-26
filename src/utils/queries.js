import axios from 'axios';
import { COCKTAILS_SEARCH_URL, COCKTAIL_LOOKUP_URL } from './constants';

export const searchItemsQuery = (searchTerm) => {
  return {
    queryKey: ['search', searchTerm || 'lemon'],
    queryFn: async () => {
      searchTerm = searchTerm || 'lemon';

      const response = await axios.get(
        `${COCKTAILS_SEARCH_URL}?s=${searchTerm}`,
      );
      const drinks = response.data.drinks || [];

      return drinks.map(
        ({ idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass }) => ({
          id: idDrink,
          name: strDrink,
          image: strDrinkThumb,
          info: strAlcoholic,
          glass: strGlass,
        }),
      );
    },
  };
};

export const singleItemQuery = (id) => {
  return {
    queryKey: ['cocktail', id],
    queryFn: async () => {
      const { data } = await axios.get(`${COCKTAIL_LOOKUP_URL}${id}`);
      return data;
    },
  };
};
