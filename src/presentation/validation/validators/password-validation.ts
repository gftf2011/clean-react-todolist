import { FieldValidation } from '@/presentation/validation/contracts'
import { InvalidFieldError } from '@/presentation/validation/errors'

export class PasswordValidation implements FieldValidation {
  constructor (readonly field: string) {}

  private countOnlyNumbers(password: string): number {
    return password.replace(/(\D)/g, '').length;
  }

  private countOnlyUpperCaseLetters(password: string): number {
    return password.replace(/([^A-Z]*)/g, '').length;
  }

  private countOnlyLowerCaseLetters(password: string): number {
    return password.replace(/([^a-z]*)/g, '').length;
  }

  private countOnlySpecialCharacters(password: string): number {
    return password.replace(/([^\\^!@#$%&?]*)/g, '').length;
  }

  private hasEmptySpace(password: string): boolean {
    const PASSWORD_HAS_ANY_SPACE_REGEX = /(\s+)/g;

    return PASSWORD_HAS_ANY_SPACE_REGEX.test(password);
  }

  validate (input: any): void {
    if (
      !input[this.field] ||
      this.hasEmptySpace(input[this.field]) ||
      this.countOnlyNumbers(input[this.field]) < 8 ||
      this.countOnlyUpperCaseLetters(input[this.field]) < 1 ||
      this.countOnlyLowerCaseLetters(input[this.field]) < 1 ||
      this.countOnlySpecialCharacters(input[this.field]) < 1
    ) {
      throw new InvalidFieldError();
    }
  }
}