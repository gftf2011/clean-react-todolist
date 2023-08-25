import { UseCase } from '@/domain/use-cases';

import { SignUpUseCaseImpl } from '@/use-cases';
import { InvalidateNotesCacheUseCaseDecorator } from '@/use-cases/decorators';

import { AxiosHttpClient, LocalStorage } from '@/infra/gateways';

export const makeSignUpUseCase = (): UseCase => {
  const httpClient = new AxiosHttpClient();
  const storage = LocalStorage.getInstance();

  const signUpUseCase = new SignUpUseCaseImpl(
    import.meta.env.VITE_BASE_URL,
    httpClient
  );

  const decorator = new InvalidateNotesCacheUseCaseDecorator(
    signUpUseCase,
    storage
  );

  return decorator;
};
