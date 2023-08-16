import { describe, expect, it } from 'vitest';

import { Storage } from '@/use-cases/ports/gateways';

import { DeleteCacheNoteStrategy } from '@/presentation/strategies';

import { NoteBuilder } from '@/tests/builders';
import { LocalStorageMock } from '@/tests/doubles/mocks/infra/gateways';

describe('FEATURE - Delete Cache Note Strategy', () => {
  describe('SCENARIO - pagination limit is equal to 1', () => {
    const limit = 1;

    it('GIVEN "NOTES" storage is an empty array THEN should reset "NOTES" storage state', () => {
      const data = {
        [Storage.KEYS.NOTES]: [] as any[],
      };

      const noteId = 'fake_note_id';
      const storage = new LocalStorageMock(data);

      const sut = new DeleteCacheNoteStrategy({ storage, limit, noteId });

      sut.invoke();

      expect(storage.get(Storage.KEYS.NOTES)).toStrictEqual([
        {
          notes: [],
          previous: false,
          next: false,
        },
      ]);
    });

    it('GIVEN "NOTES" storage has 1 note THEN should delete selected note', () => {
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

      const noteId = note.id;
      const storage = new LocalStorageMock(data);

      const sut = new DeleteCacheNoteStrategy({ storage, limit, noteId });

      sut.invoke();

      expect(storage.get(Storage.KEYS.NOTES)).toStrictEqual([
        {
          notes: [],
          previous: false,
          next: false,
        },
      ]);
    });

    it('GIVEN "NOTES" storage has 2 notes THEN should delete selected note', () => {
      const notes = [
        NoteBuilder.note().withFinishedStatus().build(),
        NoteBuilder.note().build(),
      ];

      const data = {
        [Storage.KEYS.NOTES]: [
          {
            notes: [notes[0]],
            previous: false,
            next: true,
          },
          {
            notes: [notes[1]],
            previous: true,
            next: false,
          },
        ] as any[],
      };

      const noteId = notes[0].id;
      const storage = new LocalStorageMock(data);

      const sut = new DeleteCacheNoteStrategy({ storage, limit, noteId });

      sut.invoke();

      expect(storage.get(Storage.KEYS.NOTES)).toStrictEqual([
        {
          notes: [notes[1]],
          previous: false,
          next: false,
        },
      ]);
    });

    it('GIVEN "NOTES" storage has 3 notes THEN should delete note in the middle', () => {
      const notes = [
        NoteBuilder.note().build(),
        NoteBuilder.note().withFinishedStatus().build(),
        NoteBuilder.note().build(),
      ];

      const data = {
        [Storage.KEYS.NOTES]: [
          {
            notes: [notes[0]],
            previous: false,
            next: true,
          },
          {
            notes: [notes[1]],
            previous: true,
            next: true,
          },
          {
            notes: [notes[2]],
            previous: true,
            next: false,
          },
        ] as any[],
      };

      const noteId = notes[1].id;
      const storage = new LocalStorageMock(data);

      const sut = new DeleteCacheNoteStrategy({ storage, limit, noteId });

      sut.invoke();

      expect(storage.get(Storage.KEYS.NOTES)).toStrictEqual([
        {
          notes: [notes[0]],
          previous: false,
          next: true,
        },
        {
          notes: [notes[2]],
          previous: true,
          next: false,
        },
      ]);
    });

    it('GIVEN "NOTES" storage has 3 notes THEN should delete the first 2 notes', () => {
      const notes = [
        NoteBuilder.note().withFinishedStatus().build(),
        NoteBuilder.note().withFinishedStatus().build(),
        NoteBuilder.note().build(),
      ];

      const data = {
        [Storage.KEYS.NOTES]: [
          {
            notes: [notes[0]],
            previous: false,
            next: true,
          },
          {
            notes: [notes[1]],
            previous: true,
            next: true,
          },
          {
            notes: [notes[2]],
            previous: true,
            next: false,
          },
        ] as any[],
      };

      const noteId1 = notes[0].id;
      const noteId2 = notes[1].id;

      const storage = new LocalStorageMock(data);

      const sut1 = new DeleteCacheNoteStrategy({
        storage,
        limit,
        noteId: noteId1,
      });
      const sut2 = new DeleteCacheNoteStrategy({
        storage,
        limit,
        noteId: noteId2,
      });

      sut1.invoke();
      sut2.invoke();

      expect(storage.get(Storage.KEYS.NOTES)).toStrictEqual([
        {
          notes: [notes[2]],
          previous: false,
          next: false,
        },
      ]);
    });
  });
});
