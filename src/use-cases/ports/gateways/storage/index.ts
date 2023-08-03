export namespace Storage {
  export enum KEYS {
    ACCESS_TOKEN = 'ACCESS_TOKEN',
    NOTES = 'NOTES',
  }
}

export interface Storage {
  set: (key: string, value: object | null) => void;
  get: (key: string) => any;
  clear: () => void;
}
