import { CreateNoteUseCase } from '@/domain/use-cases';

import { HttpClient, HttpStatusCode } from '@/use-cases/ports/gateways';
import {
  RequiredFieldError,
  InvalidTokenError,
  ServerError,
  ServiceUnavailableError,
  UnknownError,
} from '@/use-cases/errors';

export class CreateNoteUseCaseImpl implements CreateNoteUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<void>
  ) {}

  public async execute(input: CreateNoteUseCase.Input): Promise<void> {
    const response = await this.httpClient.request({
      url: `${this.url}/api/V1/create-note`,
      method: 'post',
      headers: {
        Authorization: input.accessToken,
      },
      body: {
        title: input.title,
        description: input.description,
      },
    });

    switch (response.statusCode) {
      case HttpStatusCode.created:
        return;
      case HttpStatusCode.badRequest:
        throw new RequiredFieldError();
      case HttpStatusCode.unauthorized:
        throw new InvalidTokenError();
      case HttpStatusCode.serverError:
        throw new ServerError();
      case HttpStatusCode.serviceUnavailable:
        throw new ServiceUnavailableError();
      default:
        throw new UnknownError();
    }
  }
}
