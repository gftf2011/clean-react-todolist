import { FieldValidation } from '@/presentation/validation/contracts';

export class ErrorFieldValidator implements FieldValidation {
  constructor(readonly field: string) {}

  validate(_input: any): void {
    throw new Error('field error');
  }
}
