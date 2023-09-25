import { describe, expect, it } from 'vitest';

import { HttpStatusCode } from '@/use-cases/ports/gateways';
import { FindNotesUseCaseImpl } from '@/use-cases';
import {
  InvalidTokenError,
  ServerError,
  ServiceUnavailableError,
  UnknownError,
} from '@/use-cases/errors';

import { HttpClientStubFactory } from '@/tests/doubles/stubs/infra/gateways';

describe('FEATURE - Find Notes Use Case', () => {
  it('GIVEN api is called correctly THEN must return access token', async () => {
    const output = {
      paginatedNotes: {
        next: true,
        previous: false,
        notes: [],
      },
    };
    const input = { accessToken: '', limit: 0, page: 0 };

    const url = 'url';
    const httpClient = HttpClientStubFactory.make(HttpStatusCode.ok, output);

    const sut = new FindNotesUseCaseImpl(url, httpClient);

    const response = await sut.execute(input);

    expect(response).toBe(output);
  });

  it('GIVEN api is called incorrectly THEN must return email does not exists error', async () => {
    const input = { accessToken: '', limit: 0, page: 0 };

    const url = 'url';
    const httpClient = HttpClientStubFactory.make(HttpStatusCode.unauthorized);

    const sut = new FindNotesUseCaseImpl(url, httpClient);

    const promise = sut.execute(input);

    await expect(promise).rejects.toThrow(new InvalidTokenError());
  });

  it('GIVEN api is called incorrectly THEN must return server error', async () => {
    const input = { accessToken: '', limit: 0, page: 0 };

    const url = 'url';
    const httpClient = HttpClientStubFactory.make(HttpStatusCode.serverError);

    const sut = new FindNotesUseCaseImpl(url, httpClient);

    const promise = sut.execute(input);

    await expect(promise).rejects.toThrow(new ServerError());
  });

  it('GIVEN api is called incorrectly THEN must return service unavailable error', async () => {
    const input = { accessToken: '', limit: 0, page: 0 };

    const url = 'url';
    const httpClient = HttpClientStubFactory.make(
      HttpStatusCode.serviceUnavailable
    );

    const sut = new FindNotesUseCaseImpl(url, httpClient);

    const promise = sut.execute(input);

    await expect(promise).rejects.toThrow(new ServiceUnavailableError());
  });

  it('GIVEN api is called incorrectly THEN must return unknown error', async () => {
    const input = { accessToken: '', limit: 0, page: 0 };

    const url = 'url';
    const httpClient = HttpClientStubFactory.make(HttpStatusCode.unknown);

    const sut = new FindNotesUseCaseImpl(url, httpClient);

    const promise = sut.execute(input);

    await expect(promise).rejects.toThrow(new UnknownError());
  });
});
