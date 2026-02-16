import React from 'react';
import { useLocation, Outlet } from 'dumi';
import HomePage from '../HomePage';
import '../HomePage.less';

export default function GlobalLayout() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  if (isHome) {
    return <HomePage />;
  }

  return <Outlet />;
}
