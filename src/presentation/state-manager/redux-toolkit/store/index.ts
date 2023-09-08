import {
  configureStore,
  combineReducers,
  PreloadedState as State,
} from '@reduxjs/toolkit';

import { currentNoteSlice, paginatedNotesSlice } from '../slice';

const rootReducer = combineReducers({
  currentNote: currentNoteSlice.reducer,
  paginatedNotes: paginatedNotesSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type PreloadedState = State<RootState>;

export const setupStore = (preloadedState?: PreloadedState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type AppStore = ReturnType<typeof setupStore>;
