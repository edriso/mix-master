import axios from 'axios';
import { Navigate, useLoaderData, useNavigate } from 'react-router-dom';
import Wrapper from '../assets/wrappers/ItemPage';

const singleItemUrl =
  'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

export const loader = async ({ params }) => {
  const { id } = params;
  const { data } = await axios.get(`${singleItemUrl}${id}`);

  // "new Response" is a built-in Web API (like fetch).
  // It creates a standard HTTP Response object.
  // When you "throw" a Response inside a loader, React Router catches it
  // and renders the nearest errorElement instead of the component.
  // The first argument is the body ('Item not found'), and the second
  // is an options object where we set the status code (404).
  // This is React Router's way of saying "stop here, show the error page."
  //
  // if (!data?.drinks) {
  //   throw new Response('Item not found', { status: 404 });
  // }

  return {
    id,
    data,
  };
};

const Item = () => {
  const navigate = useNavigate();
  const { id, data } = useLoaderData();

  // if (!data?.drinks) return <h2>Something went wrong...</h2>;
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
            {validIngredients.map((item, index) => {
              return (
                <span className='ing' key={item}>
                  {item}
                  {index < validIngredients.length - 1 ? ',' : ''}
                </span>
              );
            })}
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
