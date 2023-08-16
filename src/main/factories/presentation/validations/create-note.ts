import { ValidationComposite as Composite } from '@/presentation/validation/composites';
import { ValidationBuilder as Builder } from '@/presentation/validation/builders';

export const makeCreateNoteValidation = (): Composite =>
  Composite.build([
    ...Builder.field('title').required().min(1).max(120).build(),
    ...Builder.field('description').required().min(1).max(1000).build(),
  ]);
