import { UseCase } from '@/domain/use-cases';

import { SignInUseCaseImpl } from '@/use-cases';

import { AxiosHttpClient } from '@/infra/gateways';

export const makeSignInUseCase = (): UseCase => {
  const httpClient = new AxiosHttpClient();

  const signInUseCase = new SignInUseCaseImpl(import.meta.env.VITE_BASE_URL, httpClient);

  return signInUseCase;
}