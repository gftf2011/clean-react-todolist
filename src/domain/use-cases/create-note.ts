import { UseCase } from './base';

export interface CreateNoteUseCase extends UseCase {
  execute: (input: CreateNoteUseCase.Input) => Promise<void>;
}

export namespace CreateNoteUseCase {
  export type Input = {
    accessToken: string;
    title: string;
    description: string;
  };
}
