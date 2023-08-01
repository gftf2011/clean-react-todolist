import { UseCase } from '@/domain/use-cases';

import { FindNotesUseCaseImpl } from '@/use-cases';

import { AxiosHttpClient } from '@/infra/gateways';

export const makeFindNotesUseCase = (): UseCase => {
  const httpClient = new AxiosHttpClient();

  const findNotesUseCase = new FindNotesUseCaseImpl(
    import.meta.env.VITE_BASE_URL,
    httpClient
  );

  return findNotesUseCase;
};
