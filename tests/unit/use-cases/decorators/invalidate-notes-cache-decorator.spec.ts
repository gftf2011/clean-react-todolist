import { describe, expect, it } from 'vitest';

import { Storage } from '@/use-cases/ports/gateways';
import { InvalidateNotesCacheUseCaseDecorator } from '@/use-cases/decorators';

import { SuccessUseCaseStub } from '@/tests/doubles/stubs/use-cases';
import { LocalStorageMock } from '@/tests/doubles/mocks/infra/gateways';

describe('FEATURE - Invalidate Notes Cache Decorator', () => {
  it('GIVEN use-case is called THEN notes cache must be reset', async () => {
    const interactor = new SuccessUseCaseStub();
    const storage = new LocalStorageMock();
    const sut = new InvalidateNotesCacheUseCaseDecorator(interactor, storage);

    const input = {};

    await sut.execute(input);

    expect(storage.get(Storage.KEYS.NOTES)).toStrictEqual([
      { notes: [], previous: false, next: false },
    ]);
  });
});
