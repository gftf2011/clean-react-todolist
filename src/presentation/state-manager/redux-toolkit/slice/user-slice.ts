import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  email: string;
  password: string;
}

const initialState: UserState = {
  email: '',
  password: '',
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    email: (state: UserState, action: PayloadAction<Omit<UserState, 'password'>>) => {
      state.email = action.payload.email;
    },

    password: (state: UserState, action: PayloadAction<Omit<UserState, 'email'>>) => {
      state.password = action.payload.password;
    },
  },
});
