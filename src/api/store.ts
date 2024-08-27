import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';
import { rtkQueryErrorLogger } from './ErrorCatchingMiddleware';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware ,
        rtkQueryErrorLogger
    ),
});

