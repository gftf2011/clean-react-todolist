import { UpdateNoteUseCase, Visitor } from '@/domain/use-cases';
import { HttpClient, HttpStatusCode } from '@/use-cases/ports/gateways';
import {
  InvalidNoteInformationError,
  InvalidTokenError,
  ServerError,
  ServiceUnavailableError,
  UnknownError,
} from '@/use-cases/errors';

export class UpdateNoteUseCaseImpl implements UpdateNoteUseCase {
  type?: string | undefined = 'update';

  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<UpdateNoteUseCase.Output>
  ) {}

  public async execute(
    input: UpdateNoteUseCase.Input
  ): Promise<UpdateNoteUseCase.Output> {
    const response = await this.httpClient.request({
      url: `${this.url}/api/V1/update-note`,
      method: 'put',
      headers: {
        Authorization: input.accessToken,
      },
      body: {
        id: input.noteId,
        title: input.title,
        description: input.description,
      },
    });

    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return response.body as UpdateNoteUseCase.Output;
      case HttpStatusCode.badRequest:
        throw new InvalidNoteInformationError();
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
