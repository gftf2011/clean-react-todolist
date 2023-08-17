import { describe, expect, it } from 'vitest';

import { Storage } from '@/use-cases/ports/gateways';

import { AddCacheNoteStrategy } from '@/presentation/strategies';

import { NoteBuilder } from '@/tests/builders';
import { LocalStorageMock } from '@/tests/doubles/mocks/infra/gateways';

describe('FEATURE - Add Cache Note Strategy', () => {
  describe('SCENARIO - pagination limit is equal to 1', () => {
    const limit = 1;

    it('GIVEN "NOTES" storage is empty THEN should add note', () => {
      const note = NoteBuilder.note().build();

      const data = {
        [Storage.KEYS.NOTES]: null,
      };
      const storage = new LocalStorageMock(data);

      const sut = new AddCacheNoteStrategy({ limit, note, storage });

      sut.invoke();

      expect(storage.get(Storage.KEYS.NOTES)).toStrictEqual([
        { notes: [note], next: false, previous: false },
      ]);
    });

    it('GIVEN "NOTES" storage has no notes THEN should add note', () => {
      const note = NoteBuilder.note().build();

      const data = {
        [Storage.KEYS.NOTES]: [
          {
            notes: [],
            previous: false,
            next: false,
          },
        ] as any[],
      };
      const storage = new LocalStorageMock(data);

      const sut = new AddCacheNoteStrategy({ limit, note, storage });

      sut.invoke();

      expect(storage.get(Storage.KEYS.NOTES)).toStrictEqual([
        { notes: [note], next: false, previous: false },
      ]);
    });

    it('GIVEN "NOTES" storage has a note WHEN pagination limit is exceeded THEN must rebuild pagination', () => {
      const notes = [NoteBuilder.note().build(), NoteBuilder.note().build()];

      const data = {
        [Storage.KEYS.NOTES]: [
          {
            notes: [notes[0]],
            previous: false,
            next: false,
          },
        ] as any[],
      };
      const storage = new LocalStorageMock(data);

      const sut = new AddCacheNoteStrategy({ limit, note: notes[1], storage });

      sut.invoke();

      expect(storage.get(Storage.KEYS.NOTES)).toStrictEqual([
        { notes: [notes[0]], next: true, previous: false },
        { notes: [notes[1]], next: false, previous: true },
      ]);
    });
  });

  describe('SCENARIO - pagination limit is equal to 2', () => {
    const limit = 2;

    it('GIVEN "NOTES" storage is empty THEN should add note', () => {
      const note = NoteBuilder.note().build();

      const data = {
        [Storage.KEYS.NOTES]: null,
      };
      const storage = new LocalStorageMock(data);

      const sut = new AddCacheNoteStrategy({ limit, note, storage });

      sut.invoke();

      expect(storage.get(Storage.KEYS.NOTES)).toStrictEqual([
        { notes: [note], next: false, previous: false },
      ]);
    });

    it('GIVEN "NOTES" storage has no notes THEN should add note', () => {
      const note = NoteBuilder.note().build();

      const data = {
        [Storage.KEYS.NOTES]: [
          {
            notes: [],
            previous: false,
            next: false,
          },
        ] as any[],
      };
      const storage = new LocalStorageMock(data);

      const sut = new AddCacheNoteStrategy({ limit, note, storage });

      sut.invoke();

      expect(storage.get(Storage.KEYS.NOTES)).toStrictEqual([
        { notes: [note], next: false, previous: false },
      ]);
    });

    it('GIVEN "NOTES" storage has a note THEN should add note', () => {
      const notes = [NoteBuilder.note().build(), NoteBuilder.note().build()];

      const data = {
        [Storage.KEYS.NOTES]: [
          {
            notes: [notes[0]],
            previous: false,
            next: false,
          },
        ] as any[],
      };
      const storage = new LocalStorageMock(data);

      const sut = new AddCacheNoteStrategy({ limit, note: notes[1], storage });

      sut.invoke();

      expect(storage.get(Storage.KEYS.NOTES)).toStrictEqual([
        { notes: [...notes], next: false, previous: false },
      ]);
    });

    it('GIVEN "NOTES" storage has a note WHEN add two notes THEN should rebuild pagination', () => {
      const notes = [
        NoteBuilder.note().build(),
        NoteBuilder.note().build(),
        NoteBuilder.note().build(),
      ];

      const data = {
        [Storage.KEYS.NOTES]: [
          {
            notes: [notes[0]],
            previous: false,
            next: false,
          },
        ] as any[],
      };
      const storage = new LocalStorageMock(data);

      const sut1 = new AddCacheNoteStrategy({ limit, note: notes[1], storage });
      const sut2 = new AddCacheNoteStrategy({ limit, note: notes[2], storage });

      sut1.invoke();
      sut2.invoke();

      expect(storage.get(Storage.KEYS.NOTES)).toStrictEqual([
        { notes: [notes[0], notes[1]], next: true, previous: false },
        { notes: [notes[2]], next: false, previous: true },
      ]);
    });

    it('GIVEN "NOTES" storage has two note WHEN add note THEN should rebuild pagination', () => {
      const notes = [
        NoteBuilder.note().build(),
        NoteBuilder.note().build(),
        NoteBuilder.note().build(),
      ];

      const data = {
        [Storage.KEYS.NOTES]: [
          {
            notes: [notes[0], notes[1]],
            previous: false,
            next: false,
          },
        ] as any[],
      };
      const storage = new LocalStorageMock(data);

      const sut = new AddCacheNoteStrategy({ limit, note: notes[2], storage });

      sut.invoke();

      expect(storage.get(Storage.KEYS.NOTES)).toStrictEqual([
        { notes: [notes[0], notes[1]], next: true, previous: false },
        { notes: [notes[2]], next: false, previous: true },
      ]);
    });
  });
});
