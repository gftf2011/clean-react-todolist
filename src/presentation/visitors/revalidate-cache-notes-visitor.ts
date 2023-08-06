import { Note } from '@/domain/models';

import { UpdateFinishedNoteUseCase, Visitor } from '@/domain/use-cases';

import { Storage } from '@/use-cases/ports/gateways';

export class RevalidateCacheNotesVisitor implements Visitor {
  constructor(
    private readonly page: number,
    private readonly noteId: string,
    private readonly finished: boolean,
    private readonly storage: Storage
  ) {}

  public visit(_: UpdateFinishedNoteUseCase): void {
    const notes: any[] = this.storage.get(Storage.KEYS.NOTES);

    notes[this.page].notes = (notes[this.page].notes as Note[]).map((value) => {
      if (value.id === this.noteId) {
        value.finished = this.finished;
      }
      return value;
    });

    this.storage.set(Storage.KEYS.NOTES, notes);
  }
}
