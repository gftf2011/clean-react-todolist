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
    private readonly interator: FindNotesUseCase,
    private readonly storage: Storage
  ) {}

  public async execute(
    input: FindNotesUseCase.Input
  ): Promise<FindNotesUseCase.Output> {
    const notesCache: NoteCache[] = this.storage.get(Storage.KEYS.NOTES) || [];

    if (!notesCache[input.page] || notesCache[input.page].notes.length === 0) {
      const response = await this.interator.execute(input);

      notesCache[input.page] = response.paginatedNotes;

      this.storage.set(Storage.KEYS.NOTES, notesCache);

      return response;
    }

    return { paginatedNotes: notesCache[input.page] };
  }
}
