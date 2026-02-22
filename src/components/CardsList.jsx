import Wrapper from '../assets/wrappers/CardsList';
import CardItem from './CardItem';

const CardsList = ({ items }) => {
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

  return <Wrapper>
    {formattedItems.map(item => {
        return <CardItem key={item.id} {...item} />
    })}
  </Wrapper>;
};
export default CardsList;
