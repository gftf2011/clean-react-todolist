import { UseCase } from '@/domain/use-cases';

import { DeleteNoteUseCaseImpl } from '@/use-cases';

import { AxiosHttpClient } from '@/infra/gateways';

export const makeDeleteNoteUseCase = (): UseCase => {
  const httpClient = new AxiosHttpClient();

  const deleteNoteUseCase = new DeleteNoteUseCaseImpl(
    import.meta.env.VITE_BASE_URL,
    httpClient
  );

  return deleteNoteUseCase;
};
