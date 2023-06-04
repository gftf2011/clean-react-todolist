import { configureStore } from "@reduxjs/toolkit";

import { dropdownMenuSlice, userSlice } from '../slice'

export const store = configureStore({
  reducer: {
    dropdownMenu: dropdownMenuSlice.reducer,
    user: userSlice.reducer,
  },
});