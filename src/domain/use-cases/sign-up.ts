import { UseCase } from "./base";

export interface SignUpUseCase extends UseCase {
  execute: (input: SignUpUseCase.Input) => Promise<SignUpUseCase.Output>
}

export namespace SignUpUseCase {
  export type Input = {
    name: string,
    lastname: string,
    email: string,
    password: string,
  }

  export type Output = {
    accessToken: string,
  }
}