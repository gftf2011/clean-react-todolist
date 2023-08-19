import { DeleteNoteUseCase, Visitor } from '@/domain/use-cases';

export class DeleteNoteUseCaseDummy implements DeleteNoteUseCase {
  execute!: (input: DeleteNoteUseCase.Input) => Promise<void>;

  accept?: ((visitor: Visitor) => void) | undefined;

  type?: string | undefined = 'delete';
}
