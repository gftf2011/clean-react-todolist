export class RequiredFieldError extends Error {
  constructor () {
    super('required field');
    this.name = RequiredFieldError.name;
  }
}