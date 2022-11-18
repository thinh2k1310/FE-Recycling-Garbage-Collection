import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { roles } from '../../constant';
import { GuardRoute } from '../../router';

const MyStaff = React.lazy(() => import('./pages/my-staff'));

const AgentRoutes = () => {
  return (
    <GuardRoute roles={[roles.AGENT]}>
      <Routes>
        <Route path='mystaff' element={<MyStaff/>} />
      </Routes>
    </GuardRoute>
  );
};

export default AgentRoutes;
