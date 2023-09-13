export class InvalidNoteInformationError extends Error {
  constructor() {
    super();
    this.message = `please, check if note information are correct or if note exists`;
    this.name = InvalidNoteInformationError.name;
  }
}
