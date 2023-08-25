import { Storage } from '@/use-cases/ports/gateways';

// It uses singleton design pattern
export class LocalStorage implements Storage {
  private static instance: LocalStorage;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static getInstance(): LocalStorage {
    if (!LocalStorage.instance) {
      LocalStorage.instance = new LocalStorage();
    }
    return LocalStorage.instance;
  }

  set(key: string, value: object | null): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get(key: string): any {
    const response = localStorage.getItem(key);
    return response ? JSON.parse(response) : null;
  }

  clear(): void {
    localStorage.clear();
  }
}
