import { CreateNoteUseCase, Visitor } from '@/domain/use-cases';

import { HttpClient, HttpStatusCode } from '@/use-cases/ports/gateways';
import {
  RequiredFieldError,
  InvalidTokenError,
  ServerError,
  ServiceUnavailableError,
  UnknownError,
} from '@/use-cases/errors';

export class CreateNoteUseCaseImpl implements CreateNoteUseCase {
  type?: string = 'create';

  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<CreateNoteUseCase.Output>
  ) {}

  public async execute(
    input: CreateNoteUseCase.Input
  ): Promise<CreateNoteUseCase.Output> {
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
        return response.body as CreateNoteUseCase.Output;
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

  public accept(visitor: Visitor): void {
    visitor.visit(this);
  }
}
