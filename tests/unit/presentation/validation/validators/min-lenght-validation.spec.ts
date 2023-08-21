import { describe, expect, it } from 'vitest';

import { MinLengthValidation } from '@/presentation/validation/validators';
import { InvalidFieldError } from '@/presentation/validation/errors';

describe('Min Lenght Validation', () => {
  it('GIVEN validation field is valid THEN validate with no error', () => {
    const field = 'field';
    const lenght = 1;
    const sut = new MinLengthValidation(field, lenght);
    const input = {
      field: 'a',
    };
    expect(() => sut.validate(input)).not.toThrow();
  });

  it('GIVEN validation field lenght is smaller THEN must throw new "InvalidFieldError"', () => {
    const field = 'field';
    const lenght = 2;
    const sut = new MinLengthValidation(field, lenght);
    const input = {
      field: 'a',
    };
    expect(() => sut.validate(input)).toThrowError(new InvalidFieldError());
  });
});
