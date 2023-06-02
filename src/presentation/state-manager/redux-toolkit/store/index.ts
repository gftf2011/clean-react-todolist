import { configureStore } from "@reduxjs/toolkit";

import { dropdownMenuSlice } from '../slice'

export const store = configureStore({
  reducer: {
    dropdownMenu: dropdownMenuSlice.reducer,
  },
});