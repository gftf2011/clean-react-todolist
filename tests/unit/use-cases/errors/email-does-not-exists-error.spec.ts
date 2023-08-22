import { describe, expect, it } from 'vitest';

import { EmailDoesNotExistsError } from '@/use-cases/errors';

describe('Email Does Not Exists Error', () => {
  it('GIVEN error is returned THEN must have "name" AND "message" property', () => {
    const sut = new EmailDoesNotExistsError();
    expect(sut.name).toBe('EmailDoesNotExistsError');
    expect(sut.message).toBe('user email does not exists');
  });
});
