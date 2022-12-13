import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import appReducer from '../services/appSlice';
import { provincesApi } from '../services/provincesApi';
import authReducer from '../modules/auth/services/authSlice';
import { accountsApi } from '../modules/accounts/services/accountsApi';
import { statisticApi } from '../modules/home/services/statisticApi';
import { historyApi } from '../modules/history/services/historyApi';
import { agentApi } from '../modules/agent/services/agentApi';
import { giftApi } from '../modules/gift/services/giftApi';
import { tplaceApi } from '../modules/tplace/services/tplaceApi';
import { bookingsApi } from '../modules/bookings/services/bookingsApi';
import { notificationsApi } from '../modules/notifications/services/notificationsApi';

const store = configureStore({
  reducer: {
    app: appReducer,
    [provincesApi.reducerPath]: provincesApi.reducer,
    auth: authReducer,
    [accountsApi.reducerPath]: accountsApi.reducer,
    [statisticApi.reducerPath]: statisticApi.reducer,
    [historyApi.reducerPath]: historyApi.reducer,
    [agentApi.reducerPath]: agentApi.reducer,   
    [giftApi.reducerPath]: giftApi.reducer,
    [tplaceApi.reducerPath]: tplaceApi.reducer,
    [bookingsApi.reducerPath]: bookingsApi.reducer,
    [notificationsApi.reducerPath]: notificationsApi.reducer,
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      accountsApi.middleware,
      historyApi.middleware,
      statisticApi.middleware,
      agentApi.middleware,
      giftApi.middleware,
      tplaceApi.middleware,
      provincesApi.middleware,
      bookingsApi.middleware,
      notificationsApi.middleware,
    ),
});

setupListeners(store.dispatch);

export default store;
