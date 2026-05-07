import { configureStore } from '@reduxjs/toolkit';
import { supabaseAuthMiddleware } from './middleware/supabaseMiddleware';
import { modalSlice } from '@/widgets/modal-manager';
import { userSlice } from '@/entities/user';
import { supabaseApi } from '@/shared/api';
import { pageSlice, responsiveSlice } from '@/shared/model';

export const store = configureStore({
  reducer: {
    page: pageSlice.reducer,
    responsive: responsiveSlice.reducer,
    user: userSlice.reducer,
    modal: modalSlice.reducer,
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
