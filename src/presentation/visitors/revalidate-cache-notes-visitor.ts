/* eslint-disable max-classes-per-file */
import { Strategy, UseCase, Visitor } from '@/domain/use-cases';

import { Storage } from '@/use-cases/ports/gateways';
import { CacheRevalidationError } from '@/use-cases/errors';

import {
  DeleteCacheNoteStrategy,
  UpdateCacheNoteStrategy,
} from '@/presentation/strategies';

type FactoryOutput = (
  page: number,
  noteId: string,
  storage: Storage
) => Strategy;

class RevalidateCacheFactory {
  static create({ type }: UseCase): FactoryOutput {
    if (type && type === 'update') {
      return (page: number, noteId: string, storage: Storage) =>
        new UpdateCacheNoteStrategy(page, noteId, storage);
    }
    if (type && type === 'delete') {
      return (page: number, noteId: string, storage: Storage) =>
        new DeleteCacheNoteStrategy(page, noteId, storage);
    }
    throw new CacheRevalidationError();
  }
}

export class RevalidateCacheNotesVisitor implements Visitor {
  constructor(
    private readonly page: number,
    private readonly noteId: string,
    private readonly storage: Storage
  ) {}

  public visit(iteractor: UseCase): void {
    RevalidateCacheFactory.create(iteractor)(
      this.page,
      this.noteId,
      this.storage
    ).invoke();
  }
}
