import { createSlice } from "@reduxjs/toolkit";

type DropdownState = {
  isActive: boolean
}

const initialState: DropdownState = {
  isActive: false
}

export const dropdownMenuSlice = createSlice({
  name: "dropdownMenu",
  initialState,
  reducers: {
    toggle: (state: DropdownState) => {
      state.isActive = !state.isActive;
    },
  },
});
