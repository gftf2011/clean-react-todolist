import { UseCase } from '@/domain/use-cases';

import { CreateNoteUseCaseImpl } from '@/use-cases';
// import { InvalidateNotesCacheUseCaseDecorator } from '@/use-cases/decorators';

// import { AxiosHttpClient, LocalStorage } from '@/infra/gateways';
import { AxiosHttpClient } from '@/infra/gateways';

export const makeCreateNoteUseCase = (): UseCase => {
  const httpClient = new AxiosHttpClient();
  // const storage = new LocalStorage();

  const createNoteUseCase = new CreateNoteUseCaseImpl(
    import.meta.env.VITE_BASE_URL,
    httpClient
  );

  // const decorator = new InvalidateNotesCacheUseCaseDecorator(
  //   createNoteUseCase,
  //   storage
  // );

  return createNoteUseCase;

  // return decorator;
};
