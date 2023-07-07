export class EmailDoesNotExistsError extends Error {
  constructor() {
    super();
    this.message = `user email does not exists`;
    this.name = EmailDoesNotExistsError.name;
  }
}