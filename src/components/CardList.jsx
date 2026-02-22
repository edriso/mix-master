// import { useOutletContext } from 'react-router-dom';
import Wrapper from '../assets/wrappers/CardList';
import CardItem from './CardItem';

const CardList = ({ items }) => {
  if (!items?.length) {
    return <h4 style={{ textAlign: 'center' }}>No matching items found...</h4>;
  }

  const formattedItems = items.map((item) => {
    // const { idDrink: id, strDrink: name, strDrinkThumb: image, strAlcoholic: info, strGlass: glass } = item;
    // return { id, name, image, info, glass };

    const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } = item;
    return {
      id: idDrink,
      name: strDrink,
      image: strDrinkThumb,
      info: strAlcoholic,
      glass: strGlass,
    };
  });

  // const data = useOutletContext();
  // console.log(data);

  return (
    <Wrapper>
      {formattedItems.map((item) => {
        return <CardItem key={item.id} {...item} />;
      })}
    </Wrapper>
  );
};
export default CardList;
