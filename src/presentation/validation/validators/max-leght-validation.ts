import { FieldValidation } from '@/presentation/validation/contracts'
import { InvalidFieldError } from '@/presentation/validation/errors'

export class MaxLengthValidation implements FieldValidation {
  constructor (readonly field: string, private readonly maxLength: number) {}

  validate (input: any): void {
    if (input[this.field]?.length > this.maxLength) {
      throw new InvalidFieldError();
    }
  }
}