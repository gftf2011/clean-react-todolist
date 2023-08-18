/* eslint-disable no-plusplus */
import { Note } from '@/domain/models';

import { Strategy } from '@/domain/use-cases';

import { Storage } from '@/use-cases/ports/gateways';

export type DeleteCacheNoteDependency = {
  readonly limit: number;
  readonly noteId: string;
  readonly storage: Storage;
};

export class DeleteCacheNoteStrategy implements Strategy {
  constructor(private readonly dependencies: DeleteCacheNoteDependency) {}

  public invoke(): void {
    const notes: any[] = this.dependencies.storage.get(Storage.KEYS.NOTES);

    const allNotes: Note[] = [];

    for (let i = 0; i < notes.length; i++) {
      for (let j = 0; j < notes[i].notes.length; j++) {
        if (notes[i].notes[j].id !== this.dependencies.noteId) {
          allNotes.push(notes[i].notes[j]);
        } else if (
          notes[i].notes[j].id === this.dependencies.noteId &&
          !notes[i].notes[j].finished
        ) {
          throw new Error('note not finished');
        } else {
          // eslint-disable-next-line no-continue
          continue;
        }
      }
    }

    if (allNotes.length === 0) {
      this.dependencies.storage.set(Storage.KEYS.NOTES, [
        {
          notes: [],
          previous: false,
          next: false,
        },
      ]);

      return;
    }

    const rearrengedNotes: any[] = [];

    const pages = Math.ceil(allNotes.length / this.dependencies.limit);

    let itemsCounter = 0;
    for (let i = 0; i < pages; i++) {
      const notes: Note[] = [];

      let j = 0;
      while (j < this.dependencies.limit && itemsCounter < allNotes.length) {
        notes.push(allNotes[i * this.dependencies.limit + j]);
        j++;
        itemsCounter++;
      }

      const rearrengedNote: any = {
        notes,
        previous: i + 1 !== 1,
        next: i + 1 !== pages,
      };
      rearrengedNotes.push(rearrengedNote);
    }

    this.dependencies.storage.set(Storage.KEYS.NOTES, rearrengedNotes);
  }
}
