import { describe, expect, it } from 'vitest';

import { EmailValidation } from '@/presentation/validation/validators';
import { InvalidFieldError } from '@/presentation/validation/errors';

describe('Email Validation', () => {
  it('GIVEN validation field is valid THEN validate with no error', () => {
    const field = 'field';
    const sut = new EmailValidation(field);
    const input = {
      field: 'test@mail.com',
    };
    expect(() => sut.validate(input)).not.toThrow();
  });

  it('GIVEN validation field is empty THEN must throw new "RequiredFieldError"', () => {
    const field = 'field';
    const sut = new EmailValidation(field);
    const input = {};
    expect(() => sut.validate(input)).toThrowError(new InvalidFieldError());
  });

  it('GIVEN validation field is not empty WHEN is not a valid email THEN must throw new "RequiredFieldError"', () => {
    const field = 'field';
    const sut = new EmailValidation(field);
    const input = {
      field: 'test@mail',
    };
    expect(() => sut.validate(input)).toThrowError(new InvalidFieldError());
  });
});
