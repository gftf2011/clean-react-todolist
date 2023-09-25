import { describe, expect, it } from 'vitest';

import { HttpStatusCode } from '@/use-cases/ports/gateways';
import { UpdateNoteUseCaseImpl } from '@/use-cases';
import {
  InvalidNoteInformationError,
  InvalidTokenError,
  ServerError,
  ServiceUnavailableError,
  UnknownError,
} from '@/use-cases/errors';

import { HttpClientStubFactory } from '@/tests/doubles/stubs/infra/gateways';
import { VisitorSpy } from '@/tests/doubles/spies/presentation/visitors';

describe('FEATURE - Update Note Use Case', () => {
  it('GIVEN use-case has a type THEN type value must be "update"', async () => {
    const url = 'url';
    const httpClient = HttpClientStubFactory.make(HttpStatusCode.ok);

    const sut = new UpdateNoteUseCaseImpl(url, httpClient);

    expect(sut.type).toBe('update');
  });

  it('GIVEN use-case has accept method THEN must execute visitor', async () => {
    const url = 'url';
    const httpClient = HttpClientStubFactory.make(HttpStatusCode.ok);
    const visitor = new VisitorSpy();

    const sut = new UpdateNoteUseCaseImpl(url, httpClient);

    sut.accept(visitor);

    expect(visitor.visited()).toBeTruthy();
  });

  it('GIVEN api is called correctly THEN must return access token', async () => {
    const output = {
      paginatedNotes: {
        next: true,
        previous: false,
        notes: [],
      },
    };
    const input = {
      accessToken: '',
      description: '',
      noteId: '',
      title: '',
    };

    const url = 'url';
    const httpClient = HttpClientStubFactory.make(HttpStatusCode.ok, output);

    const sut = new UpdateNoteUseCaseImpl(url, httpClient);

    const response = await sut.execute(input);

    expect(response).toBe(output);
  });

  it('GIVEN api is called incorrectly THEN must return invalid note information error', async () => {
    const input = {
      accessToken: '',
      description: '',
      noteId: '',
      title: '',
    };

    const url = 'url';
    const httpClient = HttpClientStubFactory.make(HttpStatusCode.badRequest);

    const sut = new UpdateNoteUseCaseImpl(url, httpClient);

    const promise = sut.execute(input);

    await expect(promise).rejects.toThrow(new InvalidNoteInformationError());
  });

  it('GIVEN api is called incorrectly THEN must return invalid token error', async () => {
    const input = {
      accessToken: '',
      description: '',
      noteId: '',
      title: '',
    };

    const url = 'url';
    const httpClient = HttpClientStubFactory.make(HttpStatusCode.unauthorized);

    const sut = new UpdateNoteUseCaseImpl(url, httpClient);

    const promise = sut.execute(input);

    await expect(promise).rejects.toThrow(new InvalidTokenError());
  });

  it('GIVEN api is called incorrectly THEN must return server error', async () => {
    const input = {
      accessToken: '',
      description: '',
      noteId: '',
      title: '',
    };

    const url = 'url';
    const httpClient = HttpClientStubFactory.make(HttpStatusCode.serverError);

    const sut = new UpdateNoteUseCaseImpl(url, httpClient);

    const promise = sut.execute(input);

    await expect(promise).rejects.toThrow(new ServerError());
  });

  it('GIVEN api is called incorrectly THEN must return service unavailable error', async () => {
    const input = {
      accessToken: '',
      description: '',
      noteId: '',
      title: '',
    };

    const url = 'url';
    const httpClient = HttpClientStubFactory.make(
      HttpStatusCode.serviceUnavailable
    );

    const sut = new UpdateNoteUseCaseImpl(url, httpClient);

    const promise = sut.execute(input);

    await expect(promise).rejects.toThrow(new ServiceUnavailableError());
  });

  it('GIVEN api is called incorrectly THEN must return unknown error', async () => {
    const input = {
      accessToken: '',
      description: '',
      noteId: '',
      title: '',
    };

    const url = 'url';
    const httpClient = HttpClientStubFactory.make(HttpStatusCode.unknown);

    const sut = new UpdateNoteUseCaseImpl(url, httpClient);

    const promise = sut.execute(input);

    await expect(promise).rejects.toThrow(new UnknownError());
  });
});
