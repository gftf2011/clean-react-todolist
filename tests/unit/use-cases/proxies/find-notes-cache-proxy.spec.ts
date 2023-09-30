import { beforeEach, describe, expect, it } from 'vitest';

import { Storage } from '@/use-cases/ports/gateways';
import { FindNotesCacheUseCaseProxy } from '@/use-cases/proxies';

import { UseCaseMock } from '@/tests/doubles/mocks/use-cases';
import { LocalStorageMock } from '@/tests/doubles/mocks/infra/gateways';

import { NoteBuilder } from '@/tests/builders';

describe('FEATURE - Find Notes Cache Proxy', () => {
  const storage = new LocalStorageMock();

  it('GIVEN use-case is called AND has no notes cache THEN must create cache by calling the api', async () => {
    const response = Promise.resolve({
      paginatedNotes: {
        notes: [],
        next: false,
        previous: false,
      },
    });

    const interactor = new UseCaseMock(response);
    const sut = new FindNotesCacheUseCaseProxy(interactor, storage);

    const input = { accessToken: 'fake_session', limit: 10, page: 0 };

    const apiResponse = await sut.execute(input);

    expect(apiResponse).toStrictEqual({
      paginatedNotes: {
        notes: [],
        next: false,
        previous: false,
      },
    });
    expect(storage.get(Storage.KEYS.NOTES)).toStrictEqual([
      { notes: [], next: false, previous: false },
    ]);
  });

  it('GIVEN use-case is called AND has notes cache THEN must return cached notes', async () => {
    const note = NoteBuilder.note().build();

    storage.set(Storage.KEYS.NOTES, [
      { notes: [note], next: false, previous: false },
    ]);

    const response = Promise.resolve({});
    const interactor = new UseCaseMock(response);
    const sut = new FindNotesCacheUseCaseProxy(interactor, storage);

    const input = { accessToken: 'fake_session', limit: 10, page: 0 };

    const apiResponse = await sut.execute(input);

    expect(interactor.wasCalled()).toBeFalsy();
    expect(apiResponse).toStrictEqual({
      paginatedNotes: { notes: [note], next: false, previous: false },
    });
    expect(storage.get(Storage.KEYS.NOTES)).toStrictEqual([
      { notes: [note], next: false, previous: false },
    ]);
  });

  beforeEach(() => {
    storage.clear();
  });
});
