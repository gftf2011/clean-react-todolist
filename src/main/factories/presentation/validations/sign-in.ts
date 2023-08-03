import { ValidationComposite as Composite } from '@/presentation/validation/composites';
import { ValidationBuilder as Builder } from '@/presentation/validation/builders';

export const makeSignInValidation = (): Composite =>
  Composite.build([
    ...Builder.field('email').required().email().min(5).max(320).build(),
    ...Builder.field('password').required().password().min(11).max(24).build(),
  ]);
