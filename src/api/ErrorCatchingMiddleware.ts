import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

interface ErrorData {
  message: string;
  status?: string;
  data?: string; 
}

interface PayloadData {
  error: string;
}

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      console.warn('RTK Query encountered an error:', action.error);
      
      const errorData = action.error as { data?: ErrorData; message?: string };
      const payloadData = action.payload as { status?: PayloadData };

      const errorMessage: string =
        errorData.data?.message ||
        (typeof payloadData.status === 'string' ? payloadData.status : 'An unknown error occurred') ||
        'An unknown error occurred';

      toast.error(errorMessage, {
        duration: 5000,
        position: 'top-center',
      });
    }

    return next(action);
  };
