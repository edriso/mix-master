import { Outlet, useNavigation } from 'react-router-dom';
import Navbar from '../components/Navbar';

const HomeLayout = () => {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === 'loading';

  return (
    <>
      <Navbar />

      <main className='page'>
        {isPageLoading ? (
          <div className='loading' />
        ) : (
          <Outlet />
        )}
      </main>
    </>
  );
};
export default HomeLayout;
