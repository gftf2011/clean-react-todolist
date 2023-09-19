import { rest } from 'msw';
import { setupServer, SetupServer } from 'msw/node';

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

        return res(
          ctx.status(201),
          ctx.json({
            statusCode: 201,
            body: { accessToken: `access_token` },
          })
        );
      })
    );
  }

  constructor(private readonly baseUrl: string) {
    this.initDatabase();
    this.initServer();
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
    this.database = {
      users: [],
      notes: [],
    };
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
