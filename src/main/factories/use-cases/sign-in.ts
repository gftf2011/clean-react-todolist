import { UseCase } from '@/domain/use-cases';

import { SignInUseCaseImpl } from '@/use-cases';
import { InvalidateNotesCacheUseCaseDecorator } from '@/use-cases/decorators';

import { AxiosHttpClient, LocalStorage } from '@/infra/gateways';

export const makeSignInUseCase = (): UseCase => {
  const httpClient = new AxiosHttpClient();
  const storage = LocalStorage.getInstance();

  const signInUseCase = new SignInUseCaseImpl(
    import.meta.env.VITE_BASE_URL,
    httpClient
  );

  const decorator = new InvalidateNotesCacheUseCaseDecorator(
    signInUseCase,
    storage
  );

  return decorator;
};
