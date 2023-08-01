export class UnknownError extends Error {
  constructor() {
    super();
    this.message = `sorry, something happened`;
    this.name = UnknownError.name;
  }
}
