import { Navigate, useLoaderData, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Wrapper from '../assets/wrappers/ItemPage';
import { singleItemQuery } from '../utils/queries';

export const loader = (queryClient) => {
  return async ({ params }) => {
    const { id } = params;

    await queryClient.ensureQueryData(singleItemQuery(id));

    return {
      id,
    };
  };
};

const Item = () => {
  const navigate = useNavigate();
  const { id } = useLoaderData();
  const { data } = useQuery(singleItemQuery(id));

  if (!data?.drinks) return <Navigate to='/' />;

  const singleItem = data.drinks[0];
  const {
    strDrink: name,
    strDrinkThumb: image,
    strAlcoholic: info,
    strCategory: category,
    strGlass: glass,
    strInstructions: instructions,
  } = singleItem;

  const validIngredients = Object.keys(singleItem)
    .filter(
      (key) => key.startsWith('strIngredient') && singleItem[key] !== null,
    )
    .map((key) => singleItem[key]);    

  return (
    <Wrapper>
      <header>
        <button onClick={() => navigate(-1)} className='btn'>
          back home
        </button>
        <h3>{name}</h3>
      </header>
      <div className='drink'>
        <img src={image} alt={name} className='img' />
        <div className='drink-info'>
          <p>
            <span className='drink-data'>name :</span>
            {name}
          </p>
          <p>
            <span className='drink-data'>category :</span>
            {category}
          </p>
          <p>
            <span className='drink-data'>info :</span>
            {info}
          </p>
          <p>
            <span className='drink-data'>glass :</span>
            {glass}
          </p>
          <p>
            <span className='drink-data'>ingredients :</span>
            {validIngredients.join(', ')}
          </p>
          <p>
            <span className='drink-data'>instructions :</span>
            {instructions}
          </p>
        </div>
      </div>
    </Wrapper>
  );
};
export default Item;
