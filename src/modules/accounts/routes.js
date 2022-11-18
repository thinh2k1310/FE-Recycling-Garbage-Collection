import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { roles } from '../../constant';
import { GuardRoute } from '../../router';

const Account = React.lazy(() => import('./pages'));
const CustomerDetails = React.lazy(() => import('./pages/customer-details'));

const AccountRoutes = () => {
  return (
    <GuardRoute roles={[roles.ADMIN]}>
      <Routes>
        <Route index element={<Account />} />
        <Route path=':customerId' element={<CustomerDetails />} />
      </Routes>
    </GuardRoute>
  );
};

export default AccountRoutes;
