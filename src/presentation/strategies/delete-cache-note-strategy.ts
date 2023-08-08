import { Note } from '@/domain/models';

import { Strategy } from '@/domain/use-cases';

import { Storage } from '@/use-cases/ports/gateways';

export class DeleteCacheNoteStrategy implements Strategy {
  constructor(
    private readonly page: number,
    private readonly noteId: string,
    private readonly storage: Storage
  ) {}

  public invoke(): void {
    const notes: any[] = this.storage.get(Storage.KEYS.NOTES);

    notes[this.page].notes = (notes[this.page].notes as Note[]).filter(
      (value) => value.id !== this.noteId
    );

    this.storage.set(Storage.KEYS.NOTES, notes);
  }
}
