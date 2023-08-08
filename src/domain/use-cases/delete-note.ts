import { UseCase } from './base';

export interface DeleteNoteUseCase extends UseCase {
  execute: (input: DeleteNoteUseCase.Input) => Promise<void>;
}

export namespace DeleteNoteUseCase {
  export type Input = {
    accessToken: string;
    id: string;
  };
}
