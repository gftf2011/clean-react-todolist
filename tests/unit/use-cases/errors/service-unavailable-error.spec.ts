import { describe, expect, it } from 'vitest';

import { ServiceUnavailableError } from '@/use-cases/errors';

describe('Service Unavailable Error', () => {
  it('GIVEN error is returned THEN must have "name" AND "message" property', () => {
    const sut = new ServiceUnavailableError();
    expect(sut.name).toBe('ServiceUnavailableError');
    expect(sut.message).toBe(
      'service not available in the moment, try again later'
    );
  });
});
