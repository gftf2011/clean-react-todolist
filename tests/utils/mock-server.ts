import { rest } from 'msw';
import { setupServer, SetupServer } from 'msw/node';
import { v4 } from 'uuid';

import { User, Note } from '@/domain/models';

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
      }),
      rest.get(`${this.baseUrl}/api/V1/find-notes`, async (req, res, ctx) => {
        const auth = req.headers.get('Authorization')!;

        const page = Number(req.headers.get('page'));
        const limit = Number(req.headers.get('limit'));

        const userId = auth.replace('access_token-id:', '');

        if (userId === 'server-error') {
          return res(
            ctx.status(500),
            ctx.json({
              statusCode: 500,
              body: {
                name: 'Error',
                message: 'server error',
              },
            })
          );
        }

        if (!this.database.users.find((user) => user.id === userId)) {
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

        const filteredNotes = this.database.notes.filter(
          (note) => note.userId === userId
        );

        const notes = filteredNotes
          .slice(page * limit, (page + 1) * limit)
          .map((note) => ({
            id: note.id,
            title: note.title,
            description: note.description,
            finished: note.finished,
            timestamp: note.updatedAt,
          }));

        const nextNotes = filteredNotes
          .slice((page + 1) * limit, (page + 2) * limit)
          .map((note) => ({
            id: note.id,
            title: note.title,
            description: note.description,
            finished: note.finished,
            timestamp: note.updatedAt,
          }));

        return res(
          ctx.status(200),
          ctx.json({
            statusCode: 200,
            body: {
              paginatedNotes: {
                notes,
                previous: page > 0,
                next: nextNotes && nextNotes.length > 0,
              },
            },
          })
        );
      }),
      rest.patch(
        `${this.baseUrl}/api/V1/update-finished-note`,
        async (req, res, ctx) => {
          const { id, finished } = await req.json();

          const auth = req.headers.get('Authorization')!;

          const userId = auth.replace('access_token-id:', '');

          if (!this.database.users.find((user) => user.id === userId)) {
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

          this.database.notes = this.database.notes.map((note) => {
            if (note.id === id) {
              note.finished = finished;
              note.updatedAt = new Date().toISOString();
            }
            return note;
          });

          return res(
            ctx.status(200),
            ctx.json({
              statusCode: 200,
              body: this.database.notes.find((note) => note.id === id),
            })
          );
        }
      ),
      rest.delete(
        `${this.baseUrl}/api/V1/delete-note`,
        async (req, res, ctx) => {
          const { id } = await req.json();

          const auth = req.headers.get('Authorization')!;

          const userId = auth.replace('access_token-id:', '');

          if (!this.database.users.find((user) => user.id === userId)) {
            res(
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

          const foundNote = this.database.notes.find((note) => note.id === id);

          if (!foundNote?.finished) {
            res(
              ctx.status(400),
              ctx.json({
                statusCode: 400,
                body: {
                  name: 'Error',
                  message: 'not does not exists OR not finished',
                },
              })
            );
          }

          this.database.notes = this.database.notes.filter(
            (note) => note.id !== id
          );

          return res(ctx.status(204));
        }
      )
    );
  }

  constructor(private readonly baseUrl: string) {
    this.initDatabase();
    this.initServer();
  }

  public addUserToCollection(user: User): void {
    this.database.users.push(user);
  }

  public addNoteToCollection(note: Note, userId: string): void {
    this.database.notes.push({
      id: note.id,
      finished: note.finished,
      title: note.title,
      description: note.description,
      updatedAt: note.timestamp,
      createdAt: note.timestamp,
      userId,
    });
  }

  public addNotesToCollection(notes: Note[], userId: string): void {
    notes.forEach((note) => {
      this.database.notes.push({
        id: note.id,
        finished: note.finished,
        title: note.title,
        description: note.description,
        updatedAt: note.timestamp,
        createdAt: note.timestamp,
        userId,
      });
    });
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
