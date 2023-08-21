import { describe, expect, it } from 'vitest';

import { ValidationComposite } from '@/presentation/validation/composites';

import {
  ErrorFieldValidator,
  SuccessFieldValidator,
} from '@/tests/doubles/stubs/presentation/validation/validators';

describe('Validation Composite', () => {
  it('GIVEN validation field is not found THEN should return empty string', () => {
    const field = 'field';
    const sut = ValidationComposite.build([new SuccessFieldValidator(field)]);
    const response = sut.validate('field_mock', {});
    expect(response).toBe('');
  });

  it('GIVEN validation is successful THEN should return empty string', () => {
    const field = 'field';
    const sut = ValidationComposite.build([new SuccessFieldValidator(field)]);
    const response = sut.validate(field, {});
    expect(response).toBe('');
  });

  it('GIVEN validation has failed THEN should return error message', () => {
    const field = 'field';
    const sut = ValidationComposite.build([new ErrorFieldValidator(field)]);
    const response = sut.validate(field, {});
    expect(response).toBe('field error');
  });
});
