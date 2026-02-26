import Wrapper from '../assets/wrappers/CardList';
import CardItem from './CardItem';

const CardList = ({ items }) => {
  if (!items?.length) {
    return <h4 style={{ textAlign: 'center' }}>No matching items found...</h4>;
  }

  return (
    <Wrapper>
      {items.map((item) => {
        return <CardItem key={item.id} {...item} />;
      })}
    </Wrapper>
  );
};
export default CardList;
