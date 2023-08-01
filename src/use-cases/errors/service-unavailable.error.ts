export class ServiceUnavailableError extends Error {
  constructor() {
    super();
    this.message = `service not available in the moment, try again later`;
    this.name = ServiceUnavailableError.name;
  }
}
