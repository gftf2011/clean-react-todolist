export interface Validation {
  validate: (fieldName: string, input: any) => string;
}
