import { describe, expect, it } from 'vitest';

import { UnknownError } from '@/use-cases/errors';

describe('Unknown Error', () => {
  it('GIVEN error is returned THEN must have "name" AND "message" property', () => {
    const sut = new UnknownError();
    expect(sut.name).toBe('UnknownError');
    expect(sut.message).toBe('sorry, something happened');
  });
});
