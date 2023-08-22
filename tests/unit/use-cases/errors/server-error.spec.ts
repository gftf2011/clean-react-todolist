import { describe, expect, it } from 'vitest';

import { ServerError } from '@/use-cases/errors';

describe('Server Error', () => {
  it('GIVEN error is returned THEN must have "name" AND "message" property', () => {
    const sut = new ServerError();
    expect(sut.name).toBe('ServerError');
    expect(sut.message).toBe('server is not responding right now');
  });
});
