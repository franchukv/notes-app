import type { ApiError } from '../../types';

export const isApiError = (error: unknown): error is ApiError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    'data' in error &&
    typeof (error as ApiError).data?.message === 'string'
  );
};
