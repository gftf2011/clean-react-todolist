import { Note } from '@/domain/models';

import { Strategy } from '@/domain/use-cases';

import { Storage } from '@/use-cases/ports/gateways';

export type UpdateCacheNoteDependency = {
  readonly page: number;
  readonly note: Note;
  readonly storage: Storage;
};

export class UpdateCacheNoteStrategy implements Strategy {
  constructor(private readonly dependencies: UpdateCacheNoteDependency) {}

  public invoke(): void {
    const notes: any[] = this.dependencies.storage.get(Storage.KEYS.NOTES);

    if (
      !notes ||
      notes.length === 0 ||
      !(notes[this.dependencies.page].notes as any[]).find(
        (note) => note.id === this.dependencies.note.id
      )
    ) {
      throw new Error('note not found');
    }

    notes[this.dependencies.page].notes = (
      notes[this.dependencies.page].notes as Note[]
    ).map((value) => {
      if (value.id === this.dependencies.note.id) {
        value = this.dependencies.note;
      }
      return value;
    });

    this.dependencies.storage.set(Storage.KEYS.NOTES, notes);
  }
}
