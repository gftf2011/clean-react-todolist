import { describe, expect, it } from 'vitest';

import { RequiredFieldValidation } from '@/presentation/validation/validators';
import { RequiredFieldError } from '@/presentation/validation/errors';

describe('Required Field Validation', () => {
  it('GIVEN validation field is valid THEN validate with no error', () => {
    const field = 'field';
    const sut = new RequiredFieldValidation(field);
    const input = {
      field: {},
    };
    expect(() => sut.validate(input)).not.toThrow();
  });

  it('GIVEN validation field is not valid THEN must throw new "RequiredFieldError"', () => {
    const field = 'field';
    const sut = new RequiredFieldValidation(field);
    const input = {};
    expect(() => sut.validate(input)).toThrowError(new RequiredFieldError());
  });
});
