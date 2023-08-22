import { describe, expect, it } from 'vitest';

import { RequiredFieldError } from '@/use-cases/errors';

describe('Required Field Error', () => {
  it('GIVEN error is returned THEN must have "name" AND "message" property', () => {
    const sut = new RequiredFieldError();
    expect(sut.name).toBe('RequiredFieldError');
    expect(sut.message).toBe(
      'required field is missing, send informations again'
    );
  });
});
