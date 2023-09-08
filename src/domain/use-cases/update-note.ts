import { Note } from '../models';

import { UseCase } from './base';

export interface UpdateNoteUseCase extends UseCase {
  execute: (
    input: UpdateNoteUseCase.Input
  ) => Promise<UpdateNoteUseCase.Output>;
}

export namespace UpdateNoteUseCase {
  export type Input = {
    accessToken: string;
    noteId: string;
    title: string;
    description: string;
  };
  export type Output = Note;
}
