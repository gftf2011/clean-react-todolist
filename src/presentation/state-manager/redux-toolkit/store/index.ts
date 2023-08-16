import { configureStore } from '@reduxjs/toolkit';

import { currentNoteSlice, paginatedNotesSlice } from '../slice';

export const store = configureStore({
  reducer: {
    currentNote: currentNoteSlice.reducer,
    paginatedNotes: paginatedNotesSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
