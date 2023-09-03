import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Note } from '@/domain/models';

type PaginatesdNotesState = {
  value: {
    notes: Note[];
    next: boolean;
    previous: boolean;
  };
  page: number;
  limit: number;
};

const initialState: PaginatesdNotesState = {
  value: {
    notes: [],
    previous: false,
    next: false,
  },
  page: 1,
  limit: 10,
};

export const paginatedNotesSlice = createSlice({
  name: 'paginated-notes',
  initialState,
  reducers: {
    update: (
      state: PaginatesdNotesState,
      action: PayloadAction<Omit<Omit<PaginatesdNotesState, 'page'>, 'limit'>>
    ) => {
      state.value = action.payload.value;
    },
    updatePage: (
      state: PaginatesdNotesState,
      action: PayloadAction<Omit<Omit<PaginatesdNotesState, 'value'>, 'limit'>>
    ) => {
      state.page = action.payload.page;
    },
    reset: (state: PaginatesdNotesState) => {
      state.value = {
        notes: [],
        previous: false,
        next: false,
      };
      state.page = 1;
      state.limit = 2;
    },
  },
});
