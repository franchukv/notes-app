import { configureStore } from '@reduxjs/toolkit';
import { supabaseAuthMiddleware } from './middleware/supabaseMiddleware';
import { userSlice } from '@/entities/user';
import { supabaseApi } from '@/shared/api';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    [supabaseApi.reducerPath]: supabaseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(supabaseApi.middleware)
      .concat(supabaseAuthMiddleware),
});

declare global {
  type RootState = ReturnType<typeof store.getState>;
  type AppDispatch = typeof store.dispatch;
}
