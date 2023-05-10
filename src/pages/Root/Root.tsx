import { Outlet } from 'react-router-dom';
import MainNavigation from '../../components/MainNavigation/MainNavigation';
import MainSection from '../../components/MainSection/MainSection';

function RootLayout() {
  return (
    <>
      <MainNavigation />
      <MainSection>
        <Outlet />
      </MainSection>
    </>
  );
}

export default RootLayout;
