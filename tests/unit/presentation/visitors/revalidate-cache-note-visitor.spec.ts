import { describe, expect, it } from 'vitest';

import { Storage } from '@/use-cases/ports/gateways';
import { CacheRevalidationError } from '@/use-cases/errors';

import { RevalidateCacheNotesVisitor } from '@/presentation/visitors';

import { NoteBuilder } from '@/tests/builders';

import {
  UpdateFinishedNoteUseCaseDummy,
  CreateNoteUseCaseDummy,
  DeleteNoteUseCaseDummy,
  UnknownUseCaseDummy,
} from '@/tests/doubles/dummies/use-cases';

import { LocalStorageMock } from '@/tests/doubles/mocks/infra/gateways';

describe('FEATURE - Revalidate Cache Note Visitor', () => {
  describe('BACKGROUND - Operation type is correct', () => {
    it('GIVEN visitor is called WHEN type is "update" THEN must execute storage update', () => {
      const notes = [NoteBuilder.note().build()];

      const data = {
        [Storage.KEYS.NOTES]: [
          {
            notes: [notes[0]],
            previous: false,
            next: false,
          },
        ] as any[],
      };

      const page = 0;
      const noteId = notes[0].id;

      const useCase = new UpdateFinishedNoteUseCaseDummy();

      const storage = new LocalStorageMock(data);

      const sut = new RevalidateCacheNotesVisitor({
        page,
        noteId,
        finished: true,
        storage,
      });

      sut.visit(useCase);

      expect(storage.get(Storage.KEYS.NOTES)).toStrictEqual([
        {
          notes: [{ ...notes[0], finished: true }],
          next: false,
          previous: false,
        },
      ]);
    });

    it('GIVEN visitor is called WHEN type is "create" THEN must execute storage and add note', () => {
      const notes = [NoteBuilder.note().build()];

      const data = {
        [Storage.KEYS.NOTES]: [
          {
            notes: [],
            previous: false,
            next: false,
          },
        ] as any[],
      };

      const limit = 1;

      const useCase = new CreateNoteUseCaseDummy();

      const storage = new LocalStorageMock(data);

      const sut = new RevalidateCacheNotesVisitor({
        limit,
        note: notes[0],
        storage,
      });

      sut.visit(useCase);

      expect(storage.get(Storage.KEYS.NOTES)).toStrictEqual([
        {
          notes: [notes[0]],
          next: false,
          previous: false,
        },
      ]);
    });

    it('GIVEN visitor is called WHEN type is "delete" THEN must execute storage and delete note', () => {
      const notes = [NoteBuilder.note().withFinishedStatus().build()];

      const data = {
        [Storage.KEYS.NOTES]: [
          {
            notes: [notes[0]],
            previous: false,
            next: false,
          },
        ] as any[],
      };

      const limit = 1;

      const useCase = new DeleteNoteUseCaseDummy();

      const storage = new LocalStorageMock(data);

      const sut = new RevalidateCacheNotesVisitor({
        limit,
        noteId: notes[0].id,
        storage,
      });

      sut.visit(useCase);

      expect(storage.get(Storage.KEYS.NOTES)).toStrictEqual([
        {
          notes: [],
          next: false,
          previous: false,
        },
      ]);
    });
  });

  describe('BACKGROUND - Operation type is incorrect', () => {
    it('GIVEN visitor is called WHEN type is "unknown" THEN must throw error', () => {
      const useCase = new UnknownUseCaseDummy();

      const sut = new RevalidateCacheNotesVisitor({} as any);

      const throwError = () => sut.visit(useCase);

      expect(throwError).toThrowError(new CacheRevalidationError());
    });
  });
});
