import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { roles } from '../../constant';
import { GuardRoute } from '../../router';

const History = React.lazy(() => import('./pages'));

const HistoryRoutes = () => {
  return (
    <GuardRoute roles={[roles.ADMIN, roles.AGENT]}>
      <Routes>
        <Route index element={<History />} />
      </Routes>
    </GuardRoute>
  );
};

export default HistoryRoutes;
