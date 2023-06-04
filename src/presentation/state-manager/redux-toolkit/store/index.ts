import { configureStore } from "@reduxjs/toolkit";

import { dropdownMenuSlice, userSlice, signInFormSlice } from '../slice'

export const store = configureStore({
  reducer: {
    dropdownMenu: dropdownMenuSlice.reducer,
    user: userSlice.reducer,
    signInForm: signInFormSlice.reducer,
  },
});