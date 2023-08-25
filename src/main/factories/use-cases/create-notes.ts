import { UseCase } from '@/domain/use-cases';

import { CreateNoteUseCaseImpl } from '@/use-cases';

import { AxiosHttpClient } from '@/infra/gateways';

export const makeCreateNoteUseCase = (): UseCase => {
  const httpClient = new AxiosHttpClient();

  const createNoteUseCase = new CreateNoteUseCaseImpl(
    import.meta.env.VITE_BASE_URL,
    httpClient
  );

  return createNoteUseCase;
};
