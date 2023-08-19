import { Storage } from '@/use-cases/ports/gateways';

export class LocalStorageDummy implements Storage {
  set!: (key: string, value: object | null) => void;

  get!: (key: string) => any;

  clear!: () => void;
}
