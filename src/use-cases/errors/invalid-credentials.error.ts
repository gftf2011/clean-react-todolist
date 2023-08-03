export class InvalidCredentialsError extends Error {
  constructor() {
    super();
    this.message = `credentials are not valid`;
    this.name = InvalidCredentialsError.name;
  }
}
