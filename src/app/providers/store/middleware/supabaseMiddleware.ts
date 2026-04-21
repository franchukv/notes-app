import { type Middleware } from '@reduxjs/toolkit';
import { setIsRecoveryFlow } from '@/entities/user';
import { supabase, supabaseApi } from '@/shared/api';

export const supabaseAuthMiddleware: Middleware = ({ dispatch }) => {
  supabase.auth.onAuthStateChange((event) => {
    if (event === 'PASSWORD_RECOVERY') {
      dispatch(setIsRecoveryFlow(true));
    }

    if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
      dispatch(supabaseApi.util.invalidateTags(['Session', 'User']));
    }

    if (event === 'SIGNED_OUT') {
      dispatch(setIsRecoveryFlow(false));
    }
  });

  return (next) => (action) => next(action);
};
