import { describe, expect, it } from 'vitest';

import { EmailAlreadyExistsError } from '@/use-cases/errors';

describe('Email Already Exists Error', () => {
  it('GIVEN error is returned THEN must have "name" AND "message" property', () => {
    const sut = new EmailAlreadyExistsError();
    expect(sut.name).toBe('EmailAlreadyExistsError');
    expect(sut.message).toBe('user email already exists');
  });
});
