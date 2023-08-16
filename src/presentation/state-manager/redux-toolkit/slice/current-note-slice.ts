import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type NoteState = {
  value: { title: string; description: string };
};

const initialState: NoteState = {
  value: { title: '', description: '' },
};

export const currentNoteSlice = createSlice({
  name: 'current-note',
  initialState,
  reducers: {
    update: (state: NoteState, action: PayloadAction<NoteState>) => {
      state.value = action.payload.value;
    },
    reset: (state: NoteState) => {
      state.value = { title: '', description: '' };
    },
  },
});
