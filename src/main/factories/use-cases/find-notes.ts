import { UseCase } from '@/domain/use-cases';

import { FindNotesUseCaseImpl } from '@/use-cases';
import { FindNotesCacheUseCaseProxy } from '@/use-cases/proxies';

import { AxiosHttpClient, LocalStorage } from '@/infra/gateways';

export const makeFindNotesUseCase = (): UseCase => {
  const httpClient = new AxiosHttpClient();
  const storage = LocalStorage.getInstance();

  const findNotesUseCase = new FindNotesUseCaseImpl(
    import.meta.env.VITE_BASE_URL,
    httpClient
  );

  const proxy = new FindNotesCacheUseCaseProxy(findNotesUseCase, storage);

  return proxy;
};
