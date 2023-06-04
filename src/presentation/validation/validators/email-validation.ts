import { FieldValidation } from '@/presentation/validation/contracts'
import { InvalidFieldError } from '@/presentation/validation/errors'

export class EmailValidation implements FieldValidation {
  constructor (readonly field: string) {}

  validate (input: any): void {
    const EMAIL_VALIDATION_REGEX = /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

    if (!input[this.field] || EMAIL_VALIDATION_REGEX.test(input[this.field])) {
      throw new InvalidFieldError();
    }
  }
}