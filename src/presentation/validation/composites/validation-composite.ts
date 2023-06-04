import { FieldValidation } from '@/presentation/validation/contracts'
import { Validation } from '@/presentation/contracts/validation'

export class ValidationComposite implements Validation {
  private constructor (private readonly validators: FieldValidation[]) {}

  static build (validators: FieldValidation[]): ValidationComposite {
    return new ValidationComposite(validators)
  }

  validate (fieldName: string, input: object): string {
    const validators = this.validators.filter(validator => validator.field === fieldName)
    for (const validator of validators) {
      try {
        validator.validate(input)
      } catch (err) {
        const error = err as Error;
        return error.message
      }
    }
    return '';
  }
}