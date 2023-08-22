import { describe, expect, it } from 'vitest';

import { InvalidTokenError } from '@/use-cases/errors';

describe('Invalid Token Error', () => {
  it('GIVEN error is returned THEN must have "name" AND "message" property', () => {
    const sut = new InvalidTokenError();
    expect(sut.name).toBe('InvalidTokenError');
    expect(sut.message).toBe('session expired');
  });
});
