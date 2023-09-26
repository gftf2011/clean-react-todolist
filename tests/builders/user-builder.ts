import { faker } from '@faker-js/faker';

import { User } from '@/domain/models';

export class UserBuilder {
  private readonly user: User = {
    name: faker.lorem.word(),
    lastname: faker.lorem.word(),
    email: faker.internet.email(),
    id: faker.string.uuid(),
    password: faker.internet.password(),
  };

  public static user(): UserBuilder {
    return new UserBuilder();
  }

  public withCustomId(value: string): UserBuilder {
    this.user.id = value;
    return this;
  }

  public withCustomName(value: string): UserBuilder {
    this.user.name = value;
    return this;
  }

  public withCustomLastname(value: string): UserBuilder {
    this.user.lastname = value;
    return this;
  }

  public withCustomEmail(value: string): UserBuilder {
    this.user.email = value;
    return this;
  }

  public withCustomPassword(value: string): UserBuilder {
    this.user.password = value;
    return this;
  }

  public build(): User {
    return this.user;
  }
}
