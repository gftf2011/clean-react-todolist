import { describe, expect, it } from 'vitest';

import { ValidationBuilder } from '@/presentation/validation/builders';
import {
  RequiredFieldValidation,
  EmailValidation,
  MinLengthValidation,
  MaxLengthValidation,
  PasswordValidation,
} from '@/presentation/validation/validators';

describe('Validation Builder', () => {
  it('GIVEN validation is built WHEN field is required THEN should return "RequiredFieldValidation"', () => {
    const field = 'field';
    const sut = ValidationBuilder.field(field).required().build();
    expect(sut).toStrictEqual([new RequiredFieldValidation(field)]);
  });

  it('GIVEN validation is built WHEN field is email THEN should return "EmailValidation"', () => {
    const field = 'field';
    const sut = ValidationBuilder.field(field).email().build();
    expect(sut).toStrictEqual([new EmailValidation(field)]);
  });

  it('GIVEN validation is built WHEN field has min lenght THEN should return "MinLengthValidation"', () => {
    const field = 'field';
    const lenght = 1;
    const sut = ValidationBuilder.field(field).min(lenght).build();
    expect(sut).toStrictEqual([new MinLengthValidation(field, lenght)]);
  });

  it('GIVEN validation is built WHEN field has max lenght THEN should return "MaxLengthValidation"', () => {
    const field = 'field';
    const lenght = 1;
    const sut = ValidationBuilder.field(field).max(lenght).build();
    expect(sut).toStrictEqual([new MaxLengthValidation(field, lenght)]);
  });

  it('GIVEN validation is built WHEN field is password THEN should return "PasswordValidation"', () => {
    const field = 'field';
    const sut = ValidationBuilder.field(field).password().build();
    expect(sut).toStrictEqual([new PasswordValidation(field)]);
  });
});
