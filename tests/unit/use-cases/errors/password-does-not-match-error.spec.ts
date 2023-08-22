import { describe, expect, it } from 'vitest';

import { PasswordDoesNotMatchError } from '@/use-cases/errors';

describe('Password Does Not Match Error', () => {
  it('GIVEN error is returned THEN must have "name" AND "message" property', () => {
    const sut = new PasswordDoesNotMatchError();
    expect(sut.name).toBe('PasswordDoesNotMatchError');
    expect(sut.message).toBe('user password does not match');
  });
});
