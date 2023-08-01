import { Storage } from '@/use-cases/ports/gateways';

export class LocalStorage implements Storage {
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
