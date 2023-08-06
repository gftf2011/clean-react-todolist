import { configureStore } from '@reduxjs/toolkit';

import { noteSlice } from '../slice';

export const store = configureStore({
  reducer: {
    note: noteSlice.reducer,
  },
});
