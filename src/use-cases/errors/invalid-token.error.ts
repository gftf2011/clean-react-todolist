export class InvalidTokenError extends Error {
  constructor() {
    super();
    this.message = `session expired`;
    this.name = InvalidTokenError.name;
  }
}