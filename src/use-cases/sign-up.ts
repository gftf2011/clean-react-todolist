import { SignUpUseCase } from '@/domain/use-cases';
import { HttpClient, HttpStatusCode } from '@/use-cases/ports/gateways';
import {
  EmailAlreadyExistsError,
  InvalidCredentialsError,
  ServerError,
  ServiceUnavailableError,
  UnknownError,
} from '@/use-cases/errors';

export class SignUpUseCaseImpl implements SignUpUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<SignUpUseCase.Output>
  ) {}
  
  public async execute(input: SignUpUseCase.Input): Promise<SignUpUseCase.Output> {
    const response = await this.httpClient.request({
      url: `${this.url}/api/V1/sign-up`,
      method: 'post',
      body: input,
    });

    switch (response.statusCode) {
      case HttpStatusCode.ok: return response.body as SignUpUseCase.Output
      case HttpStatusCode.badRequest: throw new InvalidCredentialsError()
      case HttpStatusCode.forbidden: throw new EmailAlreadyExistsError()
      case HttpStatusCode.serverError: throw new ServerError()
      case HttpStatusCode.serviceUnavailable: throw new ServiceUnavailableError()
      default: throw new UnknownError()
    }
  }
}