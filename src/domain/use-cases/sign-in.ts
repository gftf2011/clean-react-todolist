import { UseCase } from './base';

export interface SignInUseCase extends UseCase {
  execute: (input: SignInUseCase.Input) => Promise<SignInUseCase.Output>
}

export namespace SignInUseCase {
  export type Input = {
    email: string,
    password: string,
  }

  export type Output = {
    accessToken: string,
  }
}