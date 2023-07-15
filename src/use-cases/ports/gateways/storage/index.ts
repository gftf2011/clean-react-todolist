export namespace Storage {
  export enum KEYS {
    ACCESS_TOKEN = 'ACCESS_TOKEN'
  }
}

export interface Storage {
  set: (key: string, value: object) => void
  get: (key: string) => any
}