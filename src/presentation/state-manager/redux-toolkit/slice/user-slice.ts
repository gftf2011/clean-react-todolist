import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  accessToken: string
}

const initialState: UserState = {
  accessToken: ''
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    accessToken: (state: UserState, action: PayloadAction<UserState>) => {
      state.accessToken = action.payload.accessToken;
    },
  },
});
