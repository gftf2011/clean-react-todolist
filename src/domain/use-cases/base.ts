export interface UseCase {
  execute: (input: any) => Promise<any>;
}
