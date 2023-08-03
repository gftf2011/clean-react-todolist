export class PasswordDoesNotMatchError extends Error {
  constructor() {
    super();
    this.message = `user password does not match`;
    this.name = PasswordDoesNotMatchError.name;
  }
}
