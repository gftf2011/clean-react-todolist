import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Note } from '@/domain/models';

type NoteState = {
  selectedTodo: Note | null;
};

const initialState: NoteState = {
  selectedTodo: null,
};

export const noteSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    selectedNote: (state: NoteState, action: PayloadAction<NoteState>) => {
      state.selectedTodo = action.payload.selectedTodo;
    },
  },
});
