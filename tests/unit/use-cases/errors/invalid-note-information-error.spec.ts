import { describe, expect, it } from 'vitest';

import { InvalidNoteInformationError } from '@/use-cases/errors';

describe('Invalid Note Information', () => {
  it('GIVEN error is returned THEN must have "name" AND "message" property', () => {
    const sut = new InvalidNoteInformationError();
    expect(sut.name).toBe('InvalidNoteInformationError');
    expect(sut.message).toBe(
      'please, check if note information are correct or if note exists'
    );
  });
});
