import { UpdateFinishedNoteUseCase, Visitor } from '@/domain/use-cases';
import { HttpClient, HttpStatusCode } from '@/use-cases/ports/gateways';
import {
  InvalidTokenError,
  ServerError,
  ServiceUnavailableError,
  UnknownError,
} from '@/use-cases/errors';

export class UpdateFinishedNoteUseCaseImpl
  implements UpdateFinishedNoteUseCase
{
  type?: string | undefined = 'update';

  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<UpdateFinishedNoteUseCase.Output>
  ) {}

  public async execute(
    input: UpdateFinishedNoteUseCase.Input
  ): Promise<UpdateFinishedNoteUseCase.Output> {
    const response = await this.httpClient.request({
      url: `${this.url}/api/V1/update-finished-note`,
      method: 'patch',
      headers: {
        Authorization: input.accessToken,
      },
      body: {
        id: input.noteId,
        finished: input.finished,
      },
    });

    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return response.body as UpdateFinishedNoteUseCase.Output;
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
