import { describe, expect, it } from 'vitest';

import { CacheRevalidationError } from '@/use-cases/errors';

describe('Cache Revalidation Error', () => {
  it('GIVEN error is returned THEN must have "name" AND "message" property', () => {
    const sut = new CacheRevalidationError();
    expect(sut.name).toBe('CacheRevalidationError');
    expect(sut.message).toBe('invalid revalidation cache type strategy');
  });
});
