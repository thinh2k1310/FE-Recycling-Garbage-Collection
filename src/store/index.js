import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import appReducer from '../services/appSlice';
import { provincesApi } from '../services/provincesApi';
import authReducer from '../modules/auth/services/authSlice';
import { accountsApi } from '../modules/accounts/services/accountsApi';
import { historyApi } from '../modules/history/services/historyApi';
import { giftApi } from '../modules/gift/services/giftApi';
import { salonsApi } from '../modules/salons/services/salonsApi';
import { bookingsApi } from '../modules/bookings/services/bookingsApi';
import { salonServicesApi } from '../modules/salons/services/salonServicesApi';
import { notificationsApi } from '../modules/notifications/services/notificationsApi';

const store = configureStore({
  reducer: {
    app: appReducer,
    [provincesApi.reducerPath]: provincesApi.reducer,
    auth: authReducer,
    [accountsApi.reducerPath]: accountsApi.reducer,
    [historyApi.reducerPath]: historyApi.reducer,
    [giftApi.reducerPath]: giftApi.reducer,
    [salonsApi.reducerPath]: salonsApi.reducer,
    [salonsApi.reducerPath]: salonsApi.reducer,
    [salonServicesApi.reducerPath]: salonServicesApi.reducer,
    [bookingsApi.reducerPath]: bookingsApi.reducer,
    [notificationsApi.reducerPath]: notificationsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      accountsApi.middleware,
      historyApi.middleware,
      giftApi.middleware,
      provincesApi.middleware,
      salonsApi.middleware,
      salonServicesApi.middleware,
      bookingsApi.middleware,
      notificationsApi.middleware,
    ),
});

setupListeners(store.dispatch);

export default store;
