import { UseCase } from './base';

type Note = {
  id: string,
  finished: boolean,
  title: string,
  description: string,
  timestamp: string,
}

export interface FindNotesUseCase extends UseCase {
  execute: (input: FindNotesUseCase.Input) => Promise<FindNotesUseCase.Output>
}

export namespace FindNotesUseCase {
  export type Input = {
    accessToken: string,
    page: number,
    limit: number,
  }

  export type Output = {
    paginatedNotes: {
      notes: Note[]
      previous: boolean
      next: boolean
    }
  }
}