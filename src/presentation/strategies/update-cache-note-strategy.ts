import { Note } from '@/domain/models';

import { Strategy } from '@/domain/use-cases';

import { Storage } from '@/use-cases/ports/gateways';

export type UpdateCacheNoteDependency = {
  readonly page: number;
  readonly noteId: string;
  readonly storage: Storage;
};

export class UpdateCacheNoteStrategy implements Strategy {
  constructor(private readonly dependencies: UpdateCacheNoteDependency) {}

  public invoke(): void {
    const notes: any[] = this.dependencies.storage.get(Storage.KEYS.NOTES);

    notes[this.dependencies.page].notes = (
      notes[this.dependencies.page].notes as Note[]
    ).map((value) => {
      if (value.id === this.dependencies.noteId) {
        value.finished = !value.finished;
      }
      return value;
    });

    this.dependencies.storage.set(Storage.KEYS.NOTES, notes);
  }
}