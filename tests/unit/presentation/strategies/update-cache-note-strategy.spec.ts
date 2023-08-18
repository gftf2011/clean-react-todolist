import { describe, expect, it } from 'vitest';

import { Storage } from '@/use-cases/ports/gateways';

import { UpdateCacheNoteStrategy } from '@/presentation/strategies';

import { NoteBuilder } from '@/tests/builders';
import { LocalStorageMock } from '@/tests/doubles/mocks/infra/gateways';

describe('FEATURE - Update Cache Note Strategy', () => {
  describe('SCENARIO - Note do not exists to update', () => {
    it('GIVEN "NOTES" storage is empty THEN should throw error', () => {
      const note = NoteBuilder.note().build();

      const data = {
        [Storage.KEYS.NOTES]: null,
      };
      const storage = new LocalStorageMock(data);

      const sut = new UpdateCacheNoteStrategy({
        storage,
        noteId: note.id,
        finished: true,
        page: 0,
      });

      const throwError = () => sut.invoke();

      expect(throwError).toThrowError(new Error('note not found'));
    });

    it('GIVEN "NOTES" storage is empty array THEN should throw error', () => {
      const note = NoteBuilder.note().build();

      const data = {
        [Storage.KEYS.NOTES]: [],
      };
      const storage = new LocalStorageMock(data);

      const sut = new UpdateCacheNoteStrategy({
        storage,
        noteId: note.id,
        finished: true,
        page: 0,
      });

      const throwError = () => sut.invoke();

      expect(throwError).toThrowError(new Error('note not found'));
    });

    it('GIVEN "NOTES" storage has note WHEN note is not found THEN should throw error', () => {
      const note = [NoteBuilder.note().build(), NoteBuilder.note().build()];

      const data = {
        [Storage.KEYS.NOTES]: [
          {
            notes: [note[0]],
            previous: false,
            next: false,
          },
        ] as any[],
      };
      const storage = new LocalStorageMock(data);

      const sut = new UpdateCacheNoteStrategy({
        storage,
        noteId: note[1].id,
        finished: true,
        page: 0,
      });

      const throwError = () => sut.invoke();

      expect(throwError).toThrowError(new Error('note not found'));
    });
  });

  describe('SCENARIO - Note exists to update', () => {
    it('GIVEN "NOTES" storage has a note WHEN finished status is "false" THEN should update note status to "true"', () => {
      const note = NoteBuilder.note().build();

      const data = {
        [Storage.KEYS.NOTES]: [
          {
            notes: [note],
            previous: false,
            next: false,
          },
        ] as any[],
      };
      const storage = new LocalStorageMock(data);

      const sut = new UpdateCacheNoteStrategy({
        storage,
        noteId: note.id,
        finished: true,
        page: 0,
      });

      sut.invoke();

      const updatedNote = { ...note, finished: true };

      expect(storage.get(Storage.KEYS.NOTES)).toStrictEqual([
        { notes: [updatedNote], next: false, previous: false },
      ]);
    });

    it('GIVEN "NOTES" storage has a note WHEN finished status is "true" THEN should update note status to "false"', () => {
      const note = NoteBuilder.note().withFinishedStatus().build();

      const data = {
        [Storage.KEYS.NOTES]: [
          {
            notes: [note],
            previous: false,
            next: false,
          },
        ] as any[],
      };
      const storage = new LocalStorageMock(data);

      const sut = new UpdateCacheNoteStrategy({
        storage,
        noteId: note.id,
        finished: false,
        page: 0,
      });

      sut.invoke();

      const updatedNote = { ...note, finished: false };

      expect(storage.get(Storage.KEYS.NOTES)).toStrictEqual([
        { notes: [updatedNote], next: false, previous: false },
      ]);
    });
  });
});
