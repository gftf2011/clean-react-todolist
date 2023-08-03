import { FindNotesUseCase } from '@/domain/use-cases';
import { HttpClient, HttpStatusCode } from '@/use-cases/ports/gateways';
import {
  InvalidTokenError,
  ServerError,
  ServiceUnavailableError,
  UnknownError,
} from '@/use-cases/errors';

export class FindNotesUseCaseImpl implements FindNotesUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<FindNotesUseCase.Output>
  ) {}

  public async execute(
    input: FindNotesUseCase.Input
  ): Promise<FindNotesUseCase.Output> {
    const response = await this.httpClient.request({
      url: `${this.url}/api/V1/find-notes`,
      method: 'get',
      headers: {
        Authorization: input.accessToken,
        page: input.page,
        limit: input.limit,
      },
    });

    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return response.body as FindNotesUseCase.Output;
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
