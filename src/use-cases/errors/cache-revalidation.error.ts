export class CacheRevalidationError extends Error {
  constructor() {
    super();
    this.message = `invalid revalidation cache type strategy`;
    this.name = CacheRevalidationError.name;
  }
}
