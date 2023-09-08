import { describe, expect, it } from 'vitest';

import { Storage } from '@/use-cases/ports/gateways';

import { UpdateCacheNoteStrategy } from '@/presentation/strategies';

import { NoteBuilder } from '@/tests/builders';
import { LocalStorageMock } from '@/tests/doubles/mocks/infra/gateways';

describe('FEATURE - Update Cache Note Strategy', () => {
  describe('BACKGROUND - Note do not exists to update', () => {
    it('GIVEN "NOTES" storage is empty THEN should throw error', () => {
      const note = NoteBuilder.note().build();

      const data = {
        [Storage.KEYS.NOTES]: null,
      };
      const storage = new LocalStorageMock(data);

      const sut = new UpdateCacheNoteStrategy({
        storage,
        note,
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
        note,
        page: 0,
      });

      const throwError = () => sut.invoke();

      expect(throwError).toThrowError(new Error('note not found'));
    });

    it('GIVEN "NOTES" storage has note WHEN note is not found THEN should throw error', () => {
      const note = [
        NoteBuilder.note().withCustomId('fake_id').build(),
        NoteBuilder.note().withCustomId('id').build(),
      ];

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
        note: note[1],
        page: 0,
      });

      const throwError = () => sut.invoke();

      expect(throwError).toThrowError(new Error('note not found'));
    });
  });

  describe('BACKGROUND - Note exists to update', () => {
    it('GIVEN "NOTES" storage has a note WHEN finished status is "false" THEN should update note status to "true"', () => {
      const note = NoteBuilder.note().withCustomId('fake_id').build();

      const updatedNote = NoteBuilder.note()
        .withCustomId('fake_id')
        .withFinishedStatus()
        .build();

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
        note: updatedNote,
        page: 0,
      });

      sut.invoke();

      expect(storage.get(Storage.KEYS.NOTES)).toStrictEqual([
        { notes: [updatedNote], next: false, previous: false },
      ]);
    });

    it('GIVEN "NOTES" storage has a note WHEN finished status is "true" THEN should update note status to "false"', () => {
      const note = NoteBuilder.note()
        .withCustomId('fake_id')
        .withFinishedStatus()
        .build();

      const updatedNote = NoteBuilder.note().withCustomId('fake_id').build();

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
        note: updatedNote,
        page: 0,
      });

      sut.invoke();

      expect(storage.get(Storage.KEYS.NOTES)).toStrictEqual([
        { notes: [updatedNote], next: false, previous: false },
      ]);
    });
  });
});
