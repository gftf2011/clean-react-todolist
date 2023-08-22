import { describe, expect, it } from 'vitest';

import { NotAllowedActionError } from '@/use-cases/errors';

describe('Not Allowed Action Error', () => {
  it('GIVEN error is returned THEN must have "name" AND "message" property', () => {
    const sut = new NotAllowedActionError();
    expect(sut.name).toBe('NotAllowedActionError');
    expect(sut.message).toBe('action is not allowed');
  });
});
