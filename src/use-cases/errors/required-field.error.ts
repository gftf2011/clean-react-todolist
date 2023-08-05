export class RequiredFieldError extends Error {
  constructor() {
    super();
    this.message = 'required field is missing, send informations again';
    this.name = RequiredFieldError.name;
  }
}
