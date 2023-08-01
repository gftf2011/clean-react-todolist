import { FieldValidation } from '@/presentation/validation/contracts';
import { RequiredFieldError } from '@/presentation/validation/errors';

export class RequiredFieldValidation implements FieldValidation {
  constructor(readonly field: string) {}

  validate(input: any): void {
    if (!input[this.field]) {
      throw new RequiredFieldError();
    }
  }
}
