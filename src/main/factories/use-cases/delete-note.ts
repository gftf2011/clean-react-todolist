import { UseCase } from '@/domain/use-cases';

import { DeleteNoteUseCaseImpl } from '@/use-cases';
// import { InvalidateNotesCacheUseCaseDecorator } from '@/use-cases/decorators';

import { AxiosHttpClient } from '@/infra/gateways';
// import { AxiosHttpClient, LocalStorage } from '@/infra/gateways';

export const makeDeleteNoteUseCase = (): UseCase => {
  const httpClient = new AxiosHttpClient();
  // const storage = new LocalStorage();

  const deleteNoteUseCase = new DeleteNoteUseCaseImpl(
    import.meta.env.VITE_BASE_URL,
    httpClient
  );

  // const decorator = new InvalidateNotesCacheUseCaseDecorator(
  //   deleteNoteUseCase,
  //   storage
  // );

  return deleteNoteUseCase;
  // return decorator;
};
