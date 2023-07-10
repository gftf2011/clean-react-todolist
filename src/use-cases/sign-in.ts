import { SignInUseCase } from '@/domain/use-cases';
import { HttpClient, HttpStatusCode } from '@/use-cases/ports/gateways';
import {
  EmailDoesNotExistsError,
  InvalidCredentialsError,
  PasswordDoesNotMatchError,
  UnknownError,
} from '@/use-cases/errors';

export class SignInUseCaseImpl implements SignInUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<SignInUseCase.Output>
  ) {}
  
  public async execute(input: SignInUseCase.Input): Promise<SignInUseCase.Output> {
    const response = await this.httpClient.request({
      url: `${this.url}/api/V1/sign-in`,
      method: 'post',
      body: input,
    });

    switch (response.statusCode) {
      case HttpStatusCode.ok: return response.body as SignInUseCase.Output
      case HttpStatusCode.badRequest: throw new InvalidCredentialsError()
      case HttpStatusCode.unauthorized: throw new EmailDoesNotExistsError()
      case HttpStatusCode.forbidden: throw new PasswordDoesNotMatchError()
      case HttpStatusCode.serverError: throw new PasswordDoesNotMatchError()
      default: throw new UnknownError()
    }
  }
}