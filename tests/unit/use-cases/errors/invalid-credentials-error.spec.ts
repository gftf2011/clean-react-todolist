import { describe, expect, it } from 'vitest';

import { InvalidCredentialsError } from '@/use-cases/errors';

describe('Invalid Credentials Error', () => {
  it('GIVEN error is returned THEN must have "name" AND "message" property', () => {
    const sut = new InvalidCredentialsError();
    expect(sut.name).toBe('InvalidCredentialsError');
    expect(sut.message).toBe('credentials are not valid');
  });
});
