import { SignUpPage } from '@/presentation/components/pages';

import { LocalStorage } from '@/infra/gateways';

import { makeSignUpUseCase } from '@/main/factories/use-cases';
import { makeSignUpValidation } from '@/main/factories/presentation/validations';

import { SignedInRoute } from '@/main/proxies';

export const makeSignUp: React.FC = () => {
  return (
    <SignedInRoute storage={new LocalStorage()}>
      <SignUpPage
        validation={makeSignUpValidation()}
        signUpUseCase={makeSignUpUseCase()}
        storage={new LocalStorage()}
      />
    </SignedInRoute>
  );
};
