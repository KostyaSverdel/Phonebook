import { React, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from 'components/Navigation/Navigation';

const Layout = () => {
  return (
    <>
      <Suspense>
        <Navigation />
        <Outlet />
      </Suspense>
    </>
  );
};

export default Layout;
