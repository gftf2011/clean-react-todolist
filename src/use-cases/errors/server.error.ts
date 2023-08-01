export class ServerError extends Error {
  constructor() {
    super();
    this.message = `server is not responding right now`;
    this.name = ServerError.name;
  }
}
