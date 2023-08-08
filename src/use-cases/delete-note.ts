import { DeleteNoteUseCase, Visitor } from '@/domain/use-cases';

import {
  NotAllowedActionError,
  InvalidTokenError,
  ServerError,
  ServiceUnavailableError,
  UnknownError,
} from '@/use-cases/errors';
import { HttpClient, HttpStatusCode } from '@/use-cases/ports/gateways';

export class DeleteNoteUseCaseImpl implements DeleteNoteUseCase {
  type?: string | undefined = 'delete';

  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<void>
  ) {}

  public async execute(input: DeleteNoteUseCase.Input): Promise<void> {
    const response = await this.httpClient.request({
      url: `${this.url}/api/V1/delete-note`,
      method: 'delete',
      headers: {
        Authorization: input.accessToken,
      },
      body: {
        id: input.id,
      },
    });

    switch (response.statusCode) {
      case HttpStatusCode.noContent:
        return;
      case HttpStatusCode.badRequest:
        throw new NotAllowedActionError();
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
