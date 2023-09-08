import { UseCase } from '@/domain/use-cases';

import { UpdateNoteUseCaseImpl } from '@/use-cases';

import { AxiosHttpClient } from '@/infra/gateways';

export const makeUpdateNoteUseCase = (): UseCase => {
  const httpClient = new AxiosHttpClient();

  const updateNoteUseCase = new UpdateNoteUseCaseImpl(
    import.meta.env.VITE_BASE_URL,
    httpClient
  );

  return updateNoteUseCase;
};
