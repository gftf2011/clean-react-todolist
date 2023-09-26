import { describe, expect, it } from 'vitest';

import { HttpStatusCode } from '@/use-cases/ports/gateways';
import { CreateNoteUseCaseImpl } from '@/use-cases';
import {
  InvalidTokenError,
  RequiredFieldError,
  ServerError,
  ServiceUnavailableError,
  UnknownError,
} from '@/use-cases/errors';

import { HttpClientStubFactory } from '@/tests/doubles/stubs/infra/gateways';
import { VisitorSpy } from '@/tests/doubles/spies/presentation/visitors';

describe('FEATURE - Create Note Use Case', () => {
  it('GIVEN use-case has a type THEN type value must be "create"', async () => {
    const url = 'url';
    const httpClient = HttpClientStubFactory.make(HttpStatusCode.ok);

    const sut = new CreateNoteUseCaseImpl(url, httpClient);

    expect(sut.type).toBe('create');
  });

  it('GIVEN use-case has accept method THEN must execute visitor', async () => {
    const url = 'url';
    const httpClient = HttpClientStubFactory.make(HttpStatusCode.ok);
    const visitor = new VisitorSpy();

    const sut = new CreateNoteUseCaseImpl(url, httpClient);

    sut.accept(visitor);

    expect(visitor.visited()).toBeTruthy();
  });

  it('GIVEN api is called correctly THEN must return created note', async () => {
    const output = {
      id: '',
      finished: false,
      title: '',
      description: '',
      timestamp: '',
    };
    const input = {
      accessToken: '',
      description: '',
      title: '',
    };

    const url = 'url';
    const httpClient = HttpClientStubFactory.make(
      HttpStatusCode.created,
      output
    );

    const sut = new CreateNoteUseCaseImpl(url, httpClient);

    const response = await sut.execute(input);

    expect(response).toBe(output);
  });

  it('GIVEN api is called incorrectly THEN must return required field error', async () => {
    const input = {
      accessToken: '',
      description: '',
      title: '',
    };

    const url = 'url';
    const httpClient = HttpClientStubFactory.make(HttpStatusCode.badRequest);

    const sut = new CreateNoteUseCaseImpl(url, httpClient);

    const promise = sut.execute(input);

    await expect(promise).rejects.toThrow(new RequiredFieldError());
  });

  it('GIVEN api is called incorrectly THEN must return invalid token error', async () => {
    const input = {
      accessToken: '',
      description: '',
      title: '',
    };

    const url = 'url';
    const httpClient = HttpClientStubFactory.make(HttpStatusCode.unauthorized);

    const sut = new CreateNoteUseCaseImpl(url, httpClient);

    const promise = sut.execute(input);

    await expect(promise).rejects.toThrow(new InvalidTokenError());
  });

  it('GIVEN api is called incorrectly THEN must return server error', async () => {
    const input = {
      accessToken: '',
      description: '',
      title: '',
    };

    const url = 'url';
    const httpClient = HttpClientStubFactory.make(HttpStatusCode.serverError);

    const sut = new CreateNoteUseCaseImpl(url, httpClient);

    const promise = sut.execute(input);

    await expect(promise).rejects.toThrow(new ServerError());
  });

  it('GIVEN api is called incorrectly THEN must return service unavailable error', async () => {
    const input = {
      accessToken: '',
      description: '',
      title: '',
    };

    const url = 'url';
    const httpClient = HttpClientStubFactory.make(
      HttpStatusCode.serviceUnavailable
    );

    const sut = new CreateNoteUseCaseImpl(url, httpClient);

    const promise = sut.execute(input);

    await expect(promise).rejects.toThrow(new ServiceUnavailableError());
  });

  it('GIVEN api is called incorrectly THEN must return unknown error', async () => {
    const input = {
      accessToken: '',
      description: '',
      title: '',
    };

    const url = 'url';
    const httpClient = HttpClientStubFactory.make(HttpStatusCode.unknown);

    const sut = new CreateNoteUseCaseImpl(url, httpClient);

    const promise = sut.execute(input);

    await expect(promise).rejects.toThrow(new UnknownError());
  });
});
