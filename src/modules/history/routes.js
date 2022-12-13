import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { roles } from '../../constant';
import { GuardRoute } from '../../router';

const GarbageHistory = React.lazy(() => import('./pages/garbage-history'));
const GiftHistory = React.lazy(() => import('./pages/gift-history'));
const PointHistory = React.lazy(() => import('./pages/point-history'));


const HistoryRoutes = () => {
  return (
    <GuardRoute roles={[roles.ADMIN, roles.AGENT]}>
      <Routes>
        <Route path='garbage' element={<GarbageHistory />} />
        <Route path='gift' element={<GiftHistory />} />
        <Route path='point' element={<PointHistory />} />
      </Routes>
    </GuardRoute>
  );
};

export default HistoryRoutes;
