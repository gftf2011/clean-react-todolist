import { configureStore } from '@reduxjs/toolkit';

import { userSlice } from '../slice';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});
