import { rest } from 'msw';
import { setupServer, SetupServer } from 'msw/node';
import { v4 } from 'uuid';

import { User } from '@/domain/models';

type Database = {
  users: any[];
  notes: any[];
};

export class MockServer {
  private server!: SetupServer;

  private database!: Database;

  private initDatabase(): void {
    this.database = {
      users: [],
      notes: [],
    };
  }

  private initServer(): void {
    this.server = setupServer(
      rest.post(`${this.baseUrl}/api/V1/sign-up`, async (req, res, ctx) => {
        const { name, lastname, email, password } = await req.json();

        if (!name || !lastname || !email || !password) {
          return res(
            ctx.status(400),
            ctx.json({
              statusCode: 400,
              body: {
                name: 'Error',
                message: 'missing request body element',
              },
            })
          );
        }

        const user = this.database.users.find((user) => user.email === email);

        if (user) {
          return res(
            ctx.status(403),
            ctx.json({
              statusCode: 403,
              body: {
                name: 'Error',
                message: 'user already exists',
              },
            })
          );
        }

        const id = v4();
        this.database.users.push({ name, lastname, email, password, id });

        return res(
          ctx.status(201),
          ctx.json({
            statusCode: 201,
            body: { accessToken: `access_token-id:${id}` },
          })
        );
      }),
      rest.post(`${this.baseUrl}/api/V1/sign-in`, async (req, res, ctx) => {
        const { email, password } = await req.json();

        if (!email || !password) {
          return res(
            ctx.status(400),
            ctx.json({
              statusCode: 400,
              body: {
                name: 'Error',
                message: 'missing request body element',
              },
            })
          );
        }

        const user = this.database.users.find((user) => user.email === email);

        if (!user) {
          return res(
            ctx.status(401),
            ctx.json({
              statusCode: 401,
              body: {
                name: 'Error',
                message: 'user does not exists',
              },
            })
          );
        }

        if (user.password !== password) {
          return res(
            ctx.status(403),
            ctx.json({
              statusCode: 403,
              body: {
                name: 'Error',
                message: 'password does not match',
              },
            })
          );
        }
        return res(
          ctx.status(200),
          ctx.json({
            statusCode: 200,
            body: { accessToken: `access_token-id:${user.id}` },
          })
        );
      })
    );
  }

  constructor(private readonly baseUrl: string) {
    this.initDatabase();
    this.initServer();
  }

  public addUserToCollection(user: User): void {
    this.database.users.push(user);
  }

  public eraseUsersCollection(): void {
    this.database = {
      users: [],
      notes: this.database.notes,
    };
  }

  public eraseNotesCollection(): void {
    this.database = {
      users: this.database.users,
      notes: [],
    };
  }

  public eraseDatabase(): void {
    this.initDatabase();
  }

  public listen(): void {
    this.server.listen();
  }

  public resetHandlers(): void {
    this.server.resetHandlers();
  }

  public close(): void {
    this.server.close();
  }
}
