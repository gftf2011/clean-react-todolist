import { UseCase } from '@/domain/use-cases';

export class SuccessUseCaseStub implements UseCase {
  execute(_input: any): Promise<any> {
    return Promise.resolve({});
  }
}
