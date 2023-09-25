import { UseCase, Visitor } from '@/domain/use-cases';

export class VisitorSpy implements Visitor {
  private isVisited = false;

  public visited(): boolean {
    return this.isVisited;
  }

  public visit(_element: UseCase): void {
    this.isVisited = true;
  }
}
