export class InvalidFieldError extends Error {
  constructor() {
    super('invalid value');
    this.name = InvalidFieldError.name;
  }
}
