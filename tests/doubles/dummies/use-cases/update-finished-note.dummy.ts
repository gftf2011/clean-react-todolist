import { Note } from '@/domain/models';

import { UpdateFinishedNoteUseCase, Visitor } from '@/domain/use-cases';

export class UpdateFinishedNoteUseCaseDummy
  implements UpdateFinishedNoteUseCase
{
  execute!: (input: UpdateFinishedNoteUseCase.Input) => Promise<Note>;

  accept?: ((visitor: Visitor) => void) | undefined;

  type?: string | undefined = 'update';
}
