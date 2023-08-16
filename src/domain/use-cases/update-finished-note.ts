import { Note } from '../models';

import { UseCase } from './base';

export interface UpdateFinishedNoteUseCase extends UseCase {
  execute: (
    input: UpdateFinishedNoteUseCase.Input
  ) => Promise<UpdateFinishedNoteUseCase.Output>;
}

export namespace UpdateFinishedNoteUseCase {
  export type Input = {
    accessToken: string;
    noteId: string;
    finished: boolean;
  };
  export type Output = Note;
}
