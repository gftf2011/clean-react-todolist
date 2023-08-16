/* eslint-disable max-classes-per-file */
import { Strategy, UseCase, Visitor } from '@/domain/use-cases';

import { CacheRevalidationError } from '@/use-cases/errors';

import {
  AddCacheNoteDependency,
  DeleteCacheNoteDependency,
  UpdateCacheNoteDependency,
  DeleteCacheNoteStrategy,
  AddCacheNoteStrategy,
  UpdateCacheNoteStrategy,
} from '@/presentation/strategies';

type RevalidateCacheNotesDependency =
  | AddCacheNoteDependency
  | DeleteCacheNoteDependency
  | UpdateCacheNoteDependency;

type FactoryOutput = (dependency: RevalidateCacheNotesDependency) => Strategy;

class RevalidateCacheFactory {
  static create({ type }: UseCase): FactoryOutput {
    if (type && type === 'update') {
      return (dependency: RevalidateCacheNotesDependency) =>
        new UpdateCacheNoteStrategy(dependency as UpdateCacheNoteDependency);
    }
    if (type && type === 'delete') {
      return (dependency: RevalidateCacheNotesDependency) =>
        new DeleteCacheNoteStrategy(dependency as DeleteCacheNoteDependency);
    }
    if (type && type === 'create') {
      return (dependency: RevalidateCacheNotesDependency) =>
        new AddCacheNoteStrategy(dependency as AddCacheNoteDependency);
    }
    throw new CacheRevalidationError();
  }
}

export class RevalidateCacheNotesVisitor implements Visitor {
  constructor(private readonly dependency: RevalidateCacheNotesDependency) {}

  public visit(iterator: UseCase): void {
    RevalidateCacheFactory.create(iterator)(this.dependency).invoke();
  }
}
