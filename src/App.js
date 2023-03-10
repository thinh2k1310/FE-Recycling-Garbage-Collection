import { Fragment, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PrimaryLayout, SecondaryLayout } from './layouts';
import { GuardRoute } from './router';
import { PromptRemove } from './components/ui';
import { roles } from './constant';
import AuthRoutes from './modules/auth/routes';
import BookingsRoutes from './modules/bookings/routes';
import AccountRoutes from './modules/accounts/routes';
import Home from './modules/home/pages';
import NotificationsRoutes from './modules/notifications/routes';
import HistoryRoutes from './modules/history/routes';
import GiftRoutes from './modules/gift/routes';
import AgentRoutes from './modules/agent/routes';
import TPlaceRoutes from './modules/tplace/routes';


function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route element={<PrimaryLayout />}>
              <Route
                path='/'
                element={
                  <GuardRoute roles={[roles.AGENT, roles.ADMIN]}>
                    <Home />
                  </GuardRoute>
                }
              />

              {/* Manage account */}
              <Route path='accounts/*' element={<AccountRoutes />} />
              <Route path='agent/*' element={<AgentRoutes />} />
              <Route path='history/*' element={<HistoryRoutes />} />
              <Route path='gift/*' element={<GiftRoutes />} />
              <Route path='tplace/*' element={<TPlaceRoutes />} />
              <Route path='bookings/*' element={<BookingsRoutes />} />
              <Route path='notifications/*' element={<NotificationsRoutes />} />
            </Route>
            <Route element={<SecondaryLayout />}>
              <Route path='/*' element={<AuthRoutes />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>

      <PromptRemove />
    </Fragment>
  );
}

export default App;
