export class InvalidCredentialsError extends Error {
  constructor() {
    super();
    this.message = `email and/or password are not valid`;
    this.name = InvalidCredentialsError.name;
  }
}