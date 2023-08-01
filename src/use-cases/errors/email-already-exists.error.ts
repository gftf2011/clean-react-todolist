export class EmailAlreadyExistsError extends Error {
  constructor() {
    super();
    this.message = `user email already exists`;
    this.name = EmailAlreadyExistsError.name;
  }
}
