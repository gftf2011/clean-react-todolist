import { UseCase, Visitor } from '@/domain/use-cases';

export class UnknownUseCaseDummy implements UseCase {
  type?: string | undefined = 'unknown';

  execute!: (input: any) => Promise<any>;

  accept?: ((visitor: Visitor) => void) | undefined;
}
