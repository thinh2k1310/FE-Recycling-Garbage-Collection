import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { roles } from '../../constant';
import { GuardRoute } from '../../router';

const TPlace = React.lazy(() => import('./pages/tplace'));

const TPlaceRoutes = () => {
  return (
    <GuardRoute roles={[roles.ADMIN]}>
      <Routes>
        <Route index element={<TPlace/>} />
      </Routes>
    </GuardRoute>
  );
};

export default TPlaceRoutes;
