import { Outlet, useNavigation } from 'react-router-dom';
import Navbar from '../components/Navbar';

const HomeLayout = () => {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === 'loading';

  // const value = 'This is a shared context value passed via Outlet';

  return (
    <>
      <Navbar />

      <main className='page'>
        {isPageLoading ? (
          <div className='loading' />
        ) : (
          <Outlet
          //  context={{ value }}
          />
        )}
      </main>
    </>
  );
};
export default HomeLayout;
