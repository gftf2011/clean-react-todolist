import { ValidationComposite as Composite } from '@/presentation/validation/composites';
import { ValidationBuilder as Builder } from '@/presentation/validation/builders';

export const makeSignUpValidation = (): Composite =>
  Composite.build([
    ...Builder.field('name').required().min(5).max(320).build(),
    ...Builder.field('lastname').required().min(5).max(320).build(),
    ...Builder.field('email').required().email().min(5).max(320).build(),
    ...Builder.field('password').required().password().min(11).max(24).build(),
  ]);
