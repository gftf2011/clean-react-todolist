import { describe, expect, it } from 'vitest';

import { PasswordValidation } from '@/presentation/validation/validators';
import { InvalidFieldError } from '@/presentation/validation/errors';

describe('Password Validation', () => {
  it('GIVEN validation field is valid THEN validate with no error', () => {
    const field = 'field';
    const sut = new PasswordValidation(field);
    const input = {
      field: '#12345678sS',
    };
    expect(() => sut.validate(input)).not.toThrow();
  });

  it('GIVEN validation field is empty THEN must throw new "InvalidFieldError"', () => {
    const field = 'field';
    const sut = new PasswordValidation(field);
    const input = {};
    expect(() => sut.validate(input)).toThrowError(new InvalidFieldError());
  });
});
