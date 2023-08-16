import { Note } from '../models';

import { UseCase } from './base';

export interface CreateNoteUseCase extends UseCase {
  execute: (
    input: CreateNoteUseCase.Input
  ) => Promise<CreateNoteUseCase.Output>;
}

export namespace CreateNoteUseCase {
  export type Input = {
    accessToken: string;
    title: string;
    description: string;
  };

  export type Output = Note;
}
