import { SignInPage } from '@/presentation/components/pages';

import { LocalStorage } from '@/infra/gateways';

import { makeSignInUseCase } from '@/main/factories/use-cases';
import { makeSignInValidation } from '@/main/factories/presentation/validations';

import { SignedInRoute } from '@/main/proxies';

export const makeSignIn: React.FC = () => {
  return (
    <SignedInRoute storage={LocalStorage.getInstance()}>
      <SignInPage
        validation={makeSignInValidation()}
        signInUseCase={makeSignInUseCase()}
        storage={LocalStorage.getInstance()}
      />
    </SignedInRoute>
  );
};
