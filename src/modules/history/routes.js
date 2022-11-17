import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { roles } from '../../constant';
import { GuardRoute } from '../../router';

const GarbageHistory = React.lazy(() => import('./pages/garbage-history'));
const GiftHistory = React.lazy(() => import('./pages/gift-history'));


const HistoryRoutes = () => {
  return (
    <GuardRoute roles={[roles.ADMIN, roles.AGENT]}>
      <Routes>
        <Route path='garbage' element={<GarbageHistory />} />
        <Route path='gift' element={<GiftHistory />} />
      </Routes>
    </GuardRoute>
  );
};

export default HistoryRoutes;
