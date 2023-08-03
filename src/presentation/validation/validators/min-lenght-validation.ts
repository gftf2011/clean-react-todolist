import { FieldValidation } from '@/presentation/validation/contracts';
import { InvalidFieldError } from '@/presentation/validation/errors';

export class MinLengthValidation implements FieldValidation {
  constructor(
    readonly field: string,
    private readonly minLength: number
  ) {}

  validate(input: any): void {
    if (input[this.field]?.length < this.minLength) {
      throw new InvalidFieldError();
    }
  }
}
