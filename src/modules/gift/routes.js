import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { roles } from '../../constant';
import { GuardRoute } from '../../router';

const MyGift = React.lazy(() => import('./pages/my-gift'));

const GiftRoutes = () => {
  return (
    <GuardRoute roles={[roles.AGENT]}>
      <Routes>
        <Route path='owner' element={<MyGift/>} />
      </Routes>
    </GuardRoute>
  );
};

export default GiftRoutes;
