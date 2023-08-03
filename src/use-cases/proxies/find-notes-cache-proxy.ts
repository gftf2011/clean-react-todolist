import { Note } from '@/domain/models';

import { FindNotesUseCase } from '@/domain/use-cases';

import { Storage } from '@/use-cases/ports/gateways';

type NoteCache = {
  previous: boolean;
  next: boolean;
  notes: Note[];
};

export class FindNotesCacheUseCaseProxy implements FindNotesUseCase {
  constructor(
    private readonly interactor: FindNotesUseCase,
    private readonly storage: Storage
  ) {}

  public async execute(
    input: FindNotesUseCase.Input
  ): Promise<FindNotesUseCase.Output> {
    const notesCache: NoteCache[] = this.storage.get(Storage.KEYS.NOTES);

    if (!notesCache) {
      const response = await this.interactor.execute(input);

      this.storage.set(Storage.KEYS.NOTES, [response.paginatedNotes]);

      return response;
    }
    if (!notesCache[input.page]) {
      const response = await this.interactor.execute(input);

      this.storage.set(Storage.KEYS.NOTES, [
        ...notesCache,
        response.paginatedNotes,
      ]);

      return response;
    }

    return { paginatedNotes: notesCache[input.page] };
  }
}
