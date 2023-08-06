import { UpdateFinishedNoteUseCase } from '@/domain/use-cases';

export interface Visitor {
  visit: (element: UpdateFinishedNoteUseCase) => void;
}

export interface UseCase {
  execute: (input: any) => Promise<any>;
  accept?: (visitor: Visitor) => void;
}
