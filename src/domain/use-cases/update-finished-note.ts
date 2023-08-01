import { UseCase } from './base';

export interface UpdateFinishedNoteUseCase extends UseCase {
  execute: (input: UpdateFinishedNoteUseCase.Input) => Promise<void>;
}

export namespace UpdateFinishedNoteUseCase {
  export type Input = {
    accessToken: string;
    noteId: string;
    finished: boolean;
  };
}
