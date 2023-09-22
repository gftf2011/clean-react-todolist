import { FieldValidation } from '@/presentation/validation/contracts';
import {
  RequiredFieldValidation,
  EmailValidation,
  MinLengthValidation,
  MaxLengthValidation,
  PasswordValidation,
} from '@/presentation/validation/validators';

export class ValidationBuilder {
  private constructor(
    private readonly fieldName: string,
    private readonly validations: FieldValidation[]
  ) {}

  static field(fieldName: string): ValidationBuilder {
    return new ValidationBuilder(fieldName, []);
  }

  required(): this {
    this.validations.push(new RequiredFieldValidation(this.fieldName));
    return this;
  }

  email(): this {
    this.validations.push(new EmailValidation(this.fieldName));
    return this;
  }

  password(): this {
    this.validations.push(new PasswordValidation(this.fieldName));
    return this;
  }

  min(length: number): this {
    this.validations.push(new MinLengthValidation(this.fieldName, length));
    return this;
  }

  max(length: number): this {
    this.validations.push(new MaxLengthValidation(this.fieldName, length));
    return this;
  }

  build(): FieldValidation[] {
    return this.validations;
  }
}
