import { Note } from '@/domain/models';

import { Strategy } from '@/domain/use-cases';

import { Storage } from '@/use-cases/ports/gateways';

export type AddCacheNoteDependency = {
  readonly limit: number;
  readonly note: Note;
  readonly storage: Storage;
};

export class AddCacheNoteStrategy implements Strategy {
  constructor(private readonly dependencies: AddCacheNoteDependency) {}

  public invoke(): void {
    let notes: any[] = this.dependencies.storage.get(Storage.KEYS.NOTES);

    if (!notes || notes.length === 0) {
      notes = [
        { notes: [this.dependencies.note], next: false, previous: false },
      ];
    } else if (
      (notes[notes.length - 1].notes as Note[]).length ===
      this.dependencies.limit - 1
    ) {
      (notes[notes.length - 1].notes as Note[]).push(this.dependencies.note);
    } else if (
      (notes[notes.length - 1].notes as Note[]).length ===
      this.dependencies.limit
    ) {
      notes[notes.length - 1].next = true;
      notes[notes.length] = {
        notes: [this.dependencies.note],
        previous: true,
        next: false,
      };
    } else {
      (notes[notes.length - 1].notes as Note[]).push(this.dependencies.note);
    }

    this.dependencies.storage.set(Storage.KEYS.NOTES, notes);
  }
}
