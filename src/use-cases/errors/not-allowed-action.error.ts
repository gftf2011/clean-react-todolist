export class NotAllowedActionError extends Error {
  constructor() {
    super();
    this.message = `action is not allowed`;
    this.name = NotAllowedActionError.name;
  }
}
