import { FieldValidation } from '@/presentation/validation/contracts';

export class SuccessFieldValidator implements FieldValidation {
  constructor(readonly field: string) {}

  validate(_input: any): void {
    return;
  }
}
