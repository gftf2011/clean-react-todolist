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

    it('GIVEN "NOTES" storage has 1 note WHEN selected note is not finidhed THEN should throw error', () => {
      const notes = [NoteBuilder.note().build()];

      const data = {
        [Storage.KEYS.NOTES]: [
          {
            notes: [...notes],
            previous: false,
            next: false,
          },
        ] as any[],
      };

      const noteId = notes[0].id;

      const storage = new LocalStorageMock(data);

      const sut = new DeleteCacheNoteStrategy({
        storage,
        limit,
        noteId,
      });

      const throwError = () => sut.invoke();

      expect(throwError).toThrowError(new Error('task not finished'));
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

    it('GIVEN "NOTES" storage has 3 notes THEN should delete first note', () => {
      const notes = [
        NoteBuilder.note().withFinishedStatus().build(),
        NoteBuilder.note().build(),
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

      const noteId = notes[0].id;
      const storage = new LocalStorageMock(data);

      const sut = new DeleteCacheNoteStrategy({ storage, limit, noteId });

      sut.invoke();

      expect(storage.get(Storage.KEYS.NOTES)).toStrictEqual([
        {
          notes: [notes[1]],
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

    it('GIVEN "NOTES" storage has 3 notes THEN should delete last note', () => {
      const notes = [
        NoteBuilder.note().build(),
        NoteBuilder.note().build(),
        NoteBuilder.note().withFinishedStatus().build(),
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

      const noteId = notes[2].id;
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
          notes: [notes[1]],
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

  describe('SCENARIO - pagination limit is equal to 2', () => {
    const limit = 2;

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

    it('GIVEN "NOTES" storage has 2 notes THEN should delete selected note', () => {
      const notes = [
        NoteBuilder.note().withFinishedStatus().build(),
        NoteBuilder.note().build(),
      ];

      const data = {
        [Storage.KEYS.NOTES]: [
          {
            notes: [...notes],
            previous: false,
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

    it('GIVEN "NOTES" storage has 3 notes WHEN selected middle note is deleted THEN pagination must be rebuilt', () => {
      const notes = [
        NoteBuilder.note().build(),
        NoteBuilder.note().withFinishedStatus().build(),
        NoteBuilder.note().build(),
      ];

      const data = {
        [Storage.KEYS.NOTES]: [
          {
            notes: [notes[0], notes[1]],
            previous: false,
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
          notes: [notes[0], notes[2]],
          previous: false,
          next: false,
        },
      ]);
    });

    it('GIVEN "NOTES" storage has 3 notes WHEN selected first note is deleted THEN pagination must be rebuilt', () => {
      const notes = [
        NoteBuilder.note().withFinishedStatus().build(),
        NoteBuilder.note().build(),
        NoteBuilder.note().build(),
      ];

      const data = {
        [Storage.KEYS.NOTES]: [
          {
            notes: [notes[0], notes[1]],
            previous: false,
            next: true,
          },
          {
            notes: [notes[2]],
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
          notes: [notes[1], notes[2]],
          previous: false,
          next: false,
        },
      ]);
    });

    it('GIVEN "NOTES" storage has 3 notes WHEN selected last note is deleted THEN pagination must be rebuilt', () => {
      const notes = [
        NoteBuilder.note().build(),
        NoteBuilder.note().build(),
        NoteBuilder.note().withFinishedStatus().build(),
      ];

      const data = {
        [Storage.KEYS.NOTES]: [
          {
            notes: [notes[0], notes[1]],
            previous: false,
            next: true,
          },
          {
            notes: [notes[2]],
            previous: true,
            next: false,
          },
        ] as any[],
      };

      const noteId = notes[2].id;
      const storage = new LocalStorageMock(data);

      const sut = new DeleteCacheNoteStrategy({ storage, limit, noteId });

      sut.invoke();

      expect(storage.get(Storage.KEYS.NOTES)).toStrictEqual([
        {
          notes: [notes[0], notes[1]],
          previous: false,
          next: false,
        },
      ]);
    });

    it('GIVEN "NOTES" storage has 6 notes WHEN selected penultimate note is deleted WHEN selected third note is selected THEN pagination must be rebuilt', () => {
      const notes = [
        NoteBuilder.note().build(),
        NoteBuilder.note().build(),
        NoteBuilder.note().withFinishedStatus().build(),
        NoteBuilder.note().build(),
        NoteBuilder.note().withFinishedStatus().build(),
        NoteBuilder.note().build(),
      ];

      const data = {
        [Storage.KEYS.NOTES]: [
          {
            notes: [notes[0], notes[1]],
            previous: false,
            next: true,
          },
          {
            notes: [notes[2], notes[3]],
            previous: true,
            next: true,
          },
          {
            notes: [notes[4], notes[5]],
            previous: true,
            next: false,
          },
        ] as any[],
      };

      const noteId1 = notes[4].id;
      const noteId2 = notes[2].id;

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
          notes: [notes[0], notes[1]],
          previous: false,
          next: true,
        },
        {
          notes: [notes[3], notes[5]],
          previous: true,
          next: false,
        },
      ]);
    });

    it('GIVEN "NOTES" storage has 6 notes WHEN selected first note is deleted WHEN selected second note is selected THEN pagination must be rebuilt', () => {
      const notes = [
        NoteBuilder.note().withFinishedStatus().build(),
        NoteBuilder.note().withFinishedStatus().build(),
        NoteBuilder.note().build(),
        NoteBuilder.note().build(),
        NoteBuilder.note().build(),
        NoteBuilder.note().build(),
      ];

      const data = {
        [Storage.KEYS.NOTES]: [
          {
            notes: [notes[0], notes[1]],
            previous: false,
            next: true,
          },
          {
            notes: [notes[2], notes[3]],
            previous: true,
            next: true,
          },
          {
            notes: [notes[4], notes[5]],
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
          notes: [notes[2], notes[3]],
          previous: false,
          next: true,
        },
        {
          notes: [notes[4], notes[5]],
          previous: true,
          next: false,
        },
      ]);
    });

    it('GIVEN "NOTES" storage has 6 notes WHEN selected third note is deleted WHEN selected fourth note is selected THEN pagination must be rebuilt', () => {
      const notes = [
        NoteBuilder.note().build(),
        NoteBuilder.note().build(),
        NoteBuilder.note().withFinishedStatus().build(),
        NoteBuilder.note().withFinishedStatus().build(),
        NoteBuilder.note().build(),
        NoteBuilder.note().build(),
      ];

      const data = {
        [Storage.KEYS.NOTES]: [
          {
            notes: [notes[0], notes[1]],
            previous: false,
            next: true,
          },
          {
            notes: [notes[2], notes[3]],
            previous: true,
            next: true,
          },
          {
            notes: [notes[4], notes[5]],
            previous: true,
            next: false,
          },
        ] as any[],
      };

      const noteId1 = notes[2].id;
      const noteId2 = notes[3].id;

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
          notes: [notes[0], notes[1]],
          previous: false,
          next: true,
        },
        {
          notes: [notes[4], notes[5]],
          previous: true,
          next: false,
        },
      ]);
    });

    it('GIVEN "NOTES" storage has 6 notes WHEN selected penultimate note is deleted WHEN selected last note is selected THEN pagination must be rebuilt', () => {
      const notes = [
        NoteBuilder.note().build(),
        NoteBuilder.note().build(),
        NoteBuilder.note().build(),
        NoteBuilder.note().build(),
        NoteBuilder.note().withFinishedStatus().build(),
        NoteBuilder.note().withFinishedStatus().build(),
      ];

      const data = {
        [Storage.KEYS.NOTES]: [
          {
            notes: [notes[0], notes[1]],
            previous: false,
            next: true,
          },
          {
            notes: [notes[2], notes[3]],
            previous: true,
            next: true,
          },
          {
            notes: [notes[4], notes[5]],
            previous: true,
            next: false,
          },
        ] as any[],
      };

      const noteId1 = notes[4].id;
      const noteId2 = notes[5].id;

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
          notes: [notes[0], notes[1]],
          previous: false,
          next: true,
        },
        {
          notes: [notes[2], notes[3]],
          previous: true,
          next: false,
        },
      ]);
    });
  });
});
