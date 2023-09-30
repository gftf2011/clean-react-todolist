import { UseCase } from '@/domain/use-cases';

export class UseCaseMock implements UseCase {
  private called = false;

  constructor(private readonly response: Promise<any>) {}

  public wasCalled(): boolean {
    return this.called;
  }

  execute(_input: any): Promise<any> {
    this.called = true;
    return this.response;
  }
}
