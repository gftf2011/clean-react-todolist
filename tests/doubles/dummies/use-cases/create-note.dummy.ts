import { Note } from '@/domain/models';

import { CreateNoteUseCase, Visitor } from '@/domain/use-cases';

export class CreateNoteUseCaseDummy implements CreateNoteUseCase {
  execute!: (input: CreateNoteUseCase.Input) => Promise<Note>;

  accept?: ((visitor: Visitor) => void) | undefined;

  type?: string | undefined = 'create';
}
