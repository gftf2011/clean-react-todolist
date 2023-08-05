import { UseCase } from '@/domain/use-cases';

import { Storage } from '@/use-cases/ports/gateways';

export class InvalidateNotesCacheUseCaseDecorator implements UseCase {
  constructor(
    private readonly interactor: UseCase,
    private readonly storage: Storage
  ) {}

  public async execute(input: any): Promise<any> {
    const response = await this.interactor.execute(input);

    this.storage.set(Storage.KEYS.NOTES, null);

    return response;
  }
}
