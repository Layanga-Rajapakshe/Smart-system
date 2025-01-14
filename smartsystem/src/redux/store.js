import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./api/apiSlice";
import authReducer from './features/auth/authSlice';
import categoriesReducer from "./features/categoriesSlice";

const store = configureStore({
  reducer: {
    // API slices reducers
    [apiSlice.reducerPath]: apiSlice.reducer,
    categories: categoriesReducer,

    // Authentication reducer
    auth: authReducer,
  },

  // Preloaded state (optional)
  preloadedState: {},

  // Middleware setup, adding RTK Query's middleware for both apiSlice and companyApiSlice
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware),

  // Enabling Redux DevTools for debugging
  devTools: true,
});

// Setting up listeners for cache refetch on focus or reconnect
setupListeners(store.dispatch);

export default store;



