import { Note } from '../models';

import { UseCase } from './base';

export interface FindNotesUseCase extends UseCase {
  execute: (input: FindNotesUseCase.Input) => Promise<FindNotesUseCase.Output>;
}

export namespace FindNotesUseCase {
  export type Input = {
    accessToken: string;
    page: number;
    limit: number;
  };

  export type Output = {
    paginatedNotes: {
      notes: Note[];
      previous: boolean;
      next: boolean;
    };
  };
}
