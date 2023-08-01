import { UseCase } from '@/domain/use-cases';

import { UpdateFinishedNoteUseCaseImpl } from '@/use-cases';

import { AxiosHttpClient } from '@/infra/gateways';

export const makeUpdateFinishedNoteUseCase = (): UseCase => {
  const httpClient = new AxiosHttpClient();

  const updateFinishedNoteUseCase = new UpdateFinishedNoteUseCaseImpl(
    import.meta.env.VITE_BASE_URL,
    httpClient
  );

  return updateFinishedNoteUseCase;
};
