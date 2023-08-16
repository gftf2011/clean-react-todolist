import { Storage } from '@/use-cases/ports/gateways';

export class LocalStorageMock implements Storage {
  constructor(private data: any = {}) {}

  public set(key: string, value: object | null): void {
    this.data[key] = value;
  }

  public get(key: string): any {
    return this.data[key];
  }

  public clear(): void {
    this.data = {};
  }
}
