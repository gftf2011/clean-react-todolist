import { faker } from '@faker-js/faker';

import { Note } from '@/domain/models';

export class NoteBuilder {
  private readonly note: Note = {
    title: faker.lorem.word(),
    description: faker.lorem.word(),
    finished: false,
    id: faker.string.uuid(),
    timestamp: new Date().toISOString(),
  };

  public static note(): NoteBuilder {
    return new NoteBuilder();
  }

  public withCustomId(value: string): NoteBuilder {
    this.note.id = value;
    return this;
  }

  public withFinishedStatus(): NoteBuilder {
    this.note.finished = true;
    return this;
  }

  public build(): Note {
    return this.note;
  }
}
