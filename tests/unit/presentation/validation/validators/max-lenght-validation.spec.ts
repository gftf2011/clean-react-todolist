import { describe, expect, it } from 'vitest';

import { MaxLengthValidation } from '@/presentation/validation/validators';
import { InvalidFieldError } from '@/presentation/validation/errors';

describe('Max Lenght Validation', () => {
  it('GIVEN validation field is valid THEN validate with no error', () => {
    const field = 'field';
    const lenght = 1;
    const sut = new MaxLengthValidation(field, lenght);
    const input = {
      field: 'a',
    };
    expect(() => sut.validate(input)).not.toThrow();
  });

  it('GIVEN validation field lenght is greater THEN must throw new "InvalidFieldError"', () => {
    const field = 'field';
    const lenght = 0;
    const sut = new MaxLengthValidation(field, lenght);
    const input = {
      field: 'a',
    };
    expect(() => sut.validate(input)).toThrowError(new InvalidFieldError());
  });
});
