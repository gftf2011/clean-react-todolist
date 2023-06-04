export interface FieldValidation {
  field: string
  validate: (input: any) => void
}