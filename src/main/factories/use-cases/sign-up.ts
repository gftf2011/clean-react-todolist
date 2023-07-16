import { UseCase } from '@/domain/use-cases';

import { SignUpUseCaseImpl } from '@/use-cases';

import { AxiosHttpClient } from '@/infra/gateways';

export const makeSignUpUseCase = (): UseCase => {
  const httpClient = new AxiosHttpClient();

  const signUpUseCase = new SignUpUseCaseImpl(import.meta.env.VITE_BASE_URL, httpClient);

  return signUpUseCase;
}