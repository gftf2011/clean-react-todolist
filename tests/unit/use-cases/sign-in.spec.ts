import { describe, expect, it } from 'vitest';

import { HttpStatusCode } from '@/use-cases/ports/gateways';
import { SignInUseCaseImpl } from '@/use-cases';
import {
  EmailDoesNotExistsError,
  InvalidCredentialsError,
  PasswordDoesNotMatchError,
  ServerError,
  ServiceUnavailableError,
  UnknownError,
} from '@/use-cases/errors';

import { HttpClientStubFactory } from '@/tests/doubles/stubs/infra/gateways';

describe('FEATURE - Sign In Use Case', () => {
  it('GIVEN api is called correctly THEN must return access token', async () => {
    const output = {
      accessToken: '',
    };
    const input = { email: '', password: '' };

    const url = 'url';
    const httpClient = HttpClientStubFactory.make(HttpStatusCode.ok, output);

    const sut = new SignInUseCaseImpl(url, httpClient);

    const response = await sut.execute(input);

    expect(response).toBe(output);
  });

  it('GIVEN api is called incorrectly THEN must return invalid credentials error', async () => {
    const input = { email: '', password: '' };

    const url = 'url';
    const httpClient = HttpClientStubFactory.make(HttpStatusCode.badRequest);

    const sut = new SignInUseCaseImpl(url, httpClient);

    const promise = sut.execute(input);

    await expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });

  it('GIVEN api is called incorrectly THEN must return email does not exists error', async () => {
    const input = { email: '', password: '' };

    const url = 'url';
    const httpClient = HttpClientStubFactory.make(HttpStatusCode.unauthorized);

    const sut = new SignInUseCaseImpl(url, httpClient);

    const promise = sut.execute(input);

    await expect(promise).rejects.toThrow(new EmailDoesNotExistsError());
  });

  it('GIVEN api is called incorrectly THEN must return password does not match error', async () => {
    const input = { email: '', password: '' };

    const url = 'url';
    const httpClient = HttpClientStubFactory.make(HttpStatusCode.forbidden);

    const sut = new SignInUseCaseImpl(url, httpClient);

    const promise = sut.execute(input);

    await expect(promise).rejects.toThrow(new PasswordDoesNotMatchError());
  });

  it('GIVEN api is called incorrectly THEN must return server error', async () => {
    const input = { email: '', password: '' };

    const url = 'url';
    const httpClient = HttpClientStubFactory.make(HttpStatusCode.serverError);

    const sut = new SignInUseCaseImpl(url, httpClient);

    const promise = sut.execute(input);

    await expect(promise).rejects.toThrow(new ServerError());
  });

  it('GIVEN api is called incorrectly THEN must return service unavailable error', async () => {
    const input = { email: '', password: '' };

    const url = 'url';
    const httpClient = HttpClientStubFactory.make(
      HttpStatusCode.serviceUnavailable
    );

    const sut = new SignInUseCaseImpl(url, httpClient);

    const promise = sut.execute(input);

    await expect(promise).rejects.toThrow(new ServiceUnavailableError());
  });

  it('GIVEN api is called incorrectly THEN must return unknown error', async () => {
    const input = { email: '', lastname: '', name: '', password: '' };

    const url = 'url';
    const httpClient = HttpClientStubFactory.make(HttpStatusCode.unknown);

    const sut = new SignInUseCaseImpl(url, httpClient);

    const promise = sut.execute(input);

    await expect(promise).rejects.toThrow(new UnknownError());
  });
});
