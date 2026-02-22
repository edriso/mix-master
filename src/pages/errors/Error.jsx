import { Link, useRouteError } from 'react-router-dom';
import Wrapper from '../../assets/wrappers/ErrorPage';
import notFoundImg from '../../assets/not-found.svg';

const Error = () => {
  const error = useRouteError();
  // console.log(error); // useful while developing

  if (error.status === 404) {
    return (
      <Wrapper>
        <div>
          <img src={notFoundImg} alt='not found' />
          <h3>Oops!</h3>
          <p>We can't seem to find the page you are looking for</p>
          <Link to='/'>Back home</Link>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div>
        <h3>Something went wrong!</h3>
        <Link to='/'>Back home</Link>
      </div>
    </Wrapper>
  );
};
export default Error;
