import '@testing-library/jest-dom';

import React from 'react';
import {
  describe,
  it,
  afterEach,
  beforeEach,
  beforeAll,
  afterAll,
  expect,
} from 'vitest';

import { cleanup, screen, within, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  useLocation,
  createMemoryRouter,
  RouterProvider,
} from 'react-router-dom';

import { Storage } from '@/use-cases/ports/gateways';

import { LocalStorage } from '@/infra/gateways/local-storage';

import { makeTodos } from '@/main/factories/presentation/pages';

import { UserBuilder, NoteBuilder } from '@/tests/builders';
import {
  resizeScreenSize,
  renderWithProviders,
  MockServer,
} from '@/tests/utils';

type Props = {
  children: any;
};

// const sleep = (timeout: number): Promise<void> => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve();
//     }, timeout);
//   });
// };

const ElementWrapper: React.FC<Props> = ({ children }) => {
  const location = useLocation();

  return (
    <>
      {children}
      <div data-testid="location-display">{location.pathname}</div>
      <div data-testid="search-display">{location.search}</div>
    </>
  );
};

const Sut: React.FC<{ routes: any[]; initialEntries: string[] }> = ({
  routes,
  initialEntries = ['/'],
}) => {
  const router = createMemoryRouter(routes, { initialEntries });

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

describe('FEATURE - Todos Page', () => {
  const storage = LocalStorage.getInstance();
  const mockServer = new MockServer(import.meta.env.VITE_BASE_URL);

  const routes = [
    {
      path: '/',
      element: (
        <ElementWrapper>
          <></>
        </ElementWrapper>
      ),
    },
    {
      path: '/sign-in',
      element: (
        <ElementWrapper>
          <></>
        </ElementWrapper>
      ),
    },
    {
      path: '/add-todo',
      element: (
        <ElementWrapper>
          <></>
        </ElementWrapper>
      ),
    },
    {
      path: '/edit-todo/:id',
      element: (
        <ElementWrapper>
          <></>
        </ElementWrapper>
      ),
    },
    {
      path: '/todos',
      element: makeTodos({}),
    },
  ];

  beforeAll(() => {
    mockServer.listen();
  });

  describe('SCENARIO - Desktop Screen', () => {
    beforeEach(() => {
      resizeScreenSize(1200);
    });

    it('GIVEN user is in todos page AND session is active WHEN it has no notes THEN displays section with no notes', async () => {
      const user = UserBuilder.user().build();
      mockServer.addUserToCollection(user);
      storage.set(Storage.KEYS.ACCESS_TOKEN, {
        accessToken: `access_token-id:${user.id}`,
      });

      await act(async () =>
        renderWithProviders(<Sut routes={routes} initialEntries={['/todos']} />)
      );

      const noNotesTitle = await screen.findByText(
        'You have no tasks created, yet !'
      );

      expect(noNotesTitle).toBeInTheDocument();
    });

    it('GIVEN user is in todos page AND session is active WHEN it has notes THEN displays notes', async () => {
      const user = UserBuilder.user().build();
      const note = NoteBuilder.note().build();

      mockServer.addUserToCollection(user);
      mockServer.addNoteToCollection(note, user.id);

      storage.set(Storage.KEYS.ACCESS_TOKEN, {
        accessToken: `access_token-id:${user.id}`,
      });

      await act(async () =>
        renderWithProviders(<Sut routes={routes} initialEntries={['/todos']} />)
      );

      const todoCard = await screen.findByTestId(`${note.id}-todo-card-wrap`);

      expect(todoCard).toBeInTheDocument();
    });

    it('GIVEN user is in todos page AND session is active WHEN it has notes THEN displays notes', async () => {
      const user = UserBuilder.user().build();
      const note = NoteBuilder.note().build();

      mockServer.addUserToCollection(user);
      mockServer.addNoteToCollection(note, user.id);

      storage.set(Storage.KEYS.ACCESS_TOKEN, {
        accessToken: `access_token-id:${user.id}`,
      });

      await act(async () =>
        renderWithProviders(<Sut routes={routes} initialEntries={['/todos']} />)
      );

      const todoCard = await screen.findByTestId(`${note.id}-todo-card-wrap`);

      expect(todoCard).toBeInTheDocument();
    });

    it('GIVEN user is in todos page AND session is active AND it has notes WHEN user clicks in checkbox THEN checkbox must be checked', async () => {
      const userSimulator = userEvent.setup();

      const user = UserBuilder.user().build();
      const note = NoteBuilder.note().build();

      mockServer.addUserToCollection(user);
      mockServer.addNoteToCollection(note, user.id);

      storage.set(Storage.KEYS.ACCESS_TOKEN, {
        accessToken: `access_token-id:${user.id}`,
      });

      await act(async () =>
        renderWithProviders(<Sut routes={routes} initialEntries={['/todos']} />)
      );

      const todoCard = await screen.findByTestId(`${note.id}-todo-card-wrap`);

      const checkbox = todoCard.querySelector('input[type="checkbox"]')!;

      await userSimulator.click(checkbox);

      expect((checkbox as any).checked).toBeTruthy();
    });

    it('GIVEN user is in todos page AND session is active AND it has notes WHEN page loads THEN must display all notes AND no next button', async () => {
      const user = UserBuilder.user().build();
      const notes = [
        NoteBuilder.note().build(),
        NoteBuilder.note().build(),
        NoteBuilder.note().build(),
        NoteBuilder.note().build(),
        NoteBuilder.note().build(),
        NoteBuilder.note().build(),
        NoteBuilder.note().build(),
        NoteBuilder.note().build(),
        NoteBuilder.note().build(),
        NoteBuilder.note().build(),
      ];

      mockServer.addUserToCollection(user);
      mockServer.addNotesToCollection(notes, user.id);

      storage.set(Storage.KEYS.ACCESS_TOKEN, {
        accessToken: `access_token-id:${user.id}`,
      });

      const app = await act(async () =>
        renderWithProviders(<Sut routes={routes} initialEntries={['/todos']} />)
      );

      const previousButton = () =>
        app.getByTestId('previous-notes-pagination-button');
      const nextButton = () => app.getByTestId('next-notes-pagination-button');
      const listItems = app.container
        .querySelector('main')!
        .querySelector('ul')!
        .querySelectorAll('li')!;

      expect(listItems.length).toBe(10);
      expect(previousButton).toThrow();
      expect(nextButton).toThrow();
    });

    it('GIVEN user is in todos page AND session is active AND it has notes WHEN page loads THEN must display all notes AND next button', async () => {
      const user = UserBuilder.user().build();
      const notes = [
        NoteBuilder.note().build(),
        NoteBuilder.note().build(),
        NoteBuilder.note().build(),
        NoteBuilder.note().build(),
        NoteBuilder.note().build(),
        NoteBuilder.note().build(),
        NoteBuilder.note().build(),
        NoteBuilder.note().build(),
        NoteBuilder.note().build(),
        NoteBuilder.note().build(),
        NoteBuilder.note().build(),
      ];

      mockServer.addUserToCollection(user);
      mockServer.addNotesToCollection(notes, user.id);

      storage.set(Storage.KEYS.ACCESS_TOKEN, {
        accessToken: `access_token-id:${user.id}`,
      });

      const app = await act(async () =>
        renderWithProviders(<Sut routes={routes} initialEntries={['/todos']} />)
      );

      const previousButton = () =>
        app.getByTestId('previous-notes-pagination-button');
      const nextButton = app.getByTestId('next-notes-pagination-button');
      const listItems = app.container
        .querySelector('main')!
        .querySelector('ul')!
        .querySelectorAll('li')!;

      expect(listItems.length).toBe(10);
      expect(previousButton).toThrow();
      expect(nextButton).toBeInTheDocument();
    });

    it('GIVEN user is in todos page AND session is active AND it has notes WHEN page loads AND user click in next button THEN must display all notes', async () => {
      const userSimulator = userEvent.setup();

      const user = UserBuilder.user().build();
      const notes = [
        NoteBuilder.note().build(),
        NoteBuilder.note().build(),
        NoteBuilder.note().build(),
        NoteBuilder.note().build(),
        NoteBuilder.note().build(),
        NoteBuilder.note().build(),
        NoteBuilder.note().build(),
        NoteBuilder.note().build(),
        NoteBuilder.note().build(),
        NoteBuilder.note().build(),
        NoteBuilder.note().build(),
      ];

      mockServer.addUserToCollection(user);
      mockServer.addNotesToCollection(notes, user.id);

      storage.set(Storage.KEYS.ACCESS_TOKEN, {
        accessToken: `access_token-id:${user.id}`,
      });

      const app = await act(async () =>
        renderWithProviders(<Sut routes={routes} initialEntries={['/todos']} />)
      );

      let nextButton: any = app.getByTestId('next-notes-pagination-button')!;

      await act(async () => userSimulator.click(nextButton));

      const listItems = app.container
        .querySelector('main')!
        .querySelector('ul')!
        .querySelectorAll('li')!;

      nextButton = () => app.getByTestId('next-notes-pagination-button');

      const previousButton = await screen.findByTestId(
        'previous-notes-pagination-button'
      )!;

      expect(listItems.length).toBe(1);
      expect(previousButton).toBeInTheDocument();
      expect(nextButton).toThrow();
    });

    it('GIVEN user is in todos page AND session is active AND it has notes WHEN page loads AND user click in next button AND clicks in previous button THEN must display all notes', async () => {
      const userSimulator = userEvent.setup();

      const user = UserBuilder.user().build();
      const notes = [
        NoteBuilder.note().build(),
        NoteBuilder.note().build(),
        NoteBuilder.note().build(),
        NoteBuilder.note().build(),
        NoteBuilder.note().build(),
        NoteBuilder.note().build(),
        NoteBuilder.note().build(),
        NoteBuilder.note().build(),
        NoteBuilder.note().build(),
        NoteBuilder.note().build(),
        NoteBuilder.note().build(),
      ];

      mockServer.addUserToCollection(user);
      mockServer.addNotesToCollection(notes, user.id);

      storage.set(Storage.KEYS.ACCESS_TOKEN, {
        accessToken: `access_token-id:${user.id}`,
      });

      const app = await act(async () =>
        renderWithProviders(<Sut routes={routes} initialEntries={['/todos']} />)
      );

      let nextButton: any = app.getByTestId('next-notes-pagination-button')!;

      await act(async () => userSimulator.click(nextButton));

      let previousButton: any = await screen.findByTestId(
        'previous-notes-pagination-button'
      )!;

      await act(async () => userSimulator.click(previousButton));

      const listItems = app.container
        .querySelector('main')!
        .querySelector('ul')!
        .querySelectorAll('li')!;

      nextButton = await screen.findByTestId('next-notes-pagination-button');
      previousButton = () =>
        screen.getByTestId('previous-notes-pagination-button');

      expect(listItems.length).toBe(10);
      expect(previousButton).toThrow();
      expect(nextButton).toBeInTheDocument();
    });

    it('GIVEN user is in todos page AND session is active AND it has notes WHEN user clicks in checkbox AND clicks in delete button THEN must delete note', async () => {
      const userSimulator = userEvent.setup();

      const user = UserBuilder.user().build();
      const note = NoteBuilder.note().build();

      mockServer.addUserToCollection(user);
      mockServer.addNoteToCollection(note, user.id);

      storage.set(Storage.KEYS.ACCESS_TOKEN, {
        accessToken: `access_token-id:${user.id}`,
      });

      await act(async () =>
        renderWithProviders(<Sut routes={routes} initialEntries={['/todos']} />)
      );

      const todoCard = await screen.findByTestId(`${note.id}-todo-card-wrap`);

      const checkbox = todoCard.querySelector('input[type="checkbox"]')!;
      await userSimulator.click(checkbox);

      const deleteButton = (await screen.findByTestId(
        `${note.id}-todo-card-wrap`
      ))!.querySelector('button')!;

      await userSimulator.click(deleteButton);

      const noNotesTitle = await screen.findByText(
        'You have no tasks created, yet !'
      );

      expect(noNotesTitle).toBeInTheDocument();
    });

    it('GIVEN user is in todos page AND session is active AND it has notes WHEN user clicks in note THEN must redirect to edit-todo page', async () => {
      const userSimulator = userEvent.setup();

      const user = UserBuilder.user().build();
      const note = NoteBuilder.note().build();

      mockServer.addUserToCollection(user);
      mockServer.addNoteToCollection(note, user.id);

      storage.set(Storage.KEYS.ACCESS_TOKEN, {
        accessToken: `access_token-id:${user.id}`,
      });

      await act(async () =>
        renderWithProviders(<Sut routes={routes} initialEntries={['/todos']} />)
      );

      const editTodoPageLink = (await screen.findByTestId(
        `${note.id}-todo-card-wrap`
      ))!.querySelector('div[role="link"]')!;

      await userSimulator.click(editTodoPageLink);

      const { getByText: getPathname } = within(
        screen.getByTestId('location-display')
      );
      const { getByText: getSearch } = within(
        screen.getByTestId('search-display')
      );

      expect(
        getPathname(`/edit-todo/${note.id}`, { exact: true })
      ).toBeInTheDocument();
      expect(getSearch(`?page=1`, { exact: true })).toBeInTheDocument();
    });

    it('GIVEN user is in todos page AND session is active AND it has notes WHEN user clicks in create note button THEN must redirect to add-note page', async () => {
      const userSimulator = userEvent.setup();

      const user = UserBuilder.user().build();

      mockServer.addUserToCollection(user);

      storage.set(Storage.KEYS.ACCESS_TOKEN, {
        accessToken: `access_token-id:${user.id}`,
      });

      await act(async () =>
        renderWithProviders(<Sut routes={routes} initialEntries={['/todos']} />)
      );

      const createNoteLink = (await screen.findByTestId(`add-todo-link`))!;

      await userSimulator.click(createNoteLink);

      const { getByText } = within(screen.getByTestId('location-display'));

      expect(getByText(`/add-todo`, { exact: true })).toBeInTheDocument();
    });

    it('GIVEN user is in todos page WHEN there is cached session AND user clicks in log-out button THEN must redirect to home page', async () => {
      const userSimulator = userEvent.setup();

      const user = UserBuilder.user().build();

      mockServer.addUserToCollection(user);

      storage.set(Storage.KEYS.ACCESS_TOKEN, {
        accessToken: `access_token-id:${user.id}`,
      });

      const app = await act(async () =>
        renderWithProviders(<Sut routes={routes} initialEntries={['/todos']} />)
      );

      const logoutButton = app.container
        .querySelector('header')!
        .querySelector('#log-out-desktop')!;

      await userSimulator.click(logoutButton);

      const { getByText } = within(screen.getByTestId('location-display'));

      expect(getByText('/', { exact: true })).toBeInTheDocument();
    });

    it('GIVEN user is in todos page WHEN there is cached session AND session is not valid THEN must redirect to "/sign-in" page', async () => {
      const user = UserBuilder.user().build();

      mockServer.addUserToCollection(user);

      storage.set(Storage.KEYS.ACCESS_TOKEN, {
        accessToken: `access_token-id:fake_id`,
      });

      await act(async () =>
        renderWithProviders(<Sut routes={routes} initialEntries={['/todos']} />)
      );

      const { getByText } = within(screen.getByTestId('location-display'));

      expect(getByText('/sign-in', { exact: true })).toBeInTheDocument();
    });

    it('GIVEN user is in todos page WHEN there is no cached session THEN must redirect to "/sign-in" page', async () => {
      await act(async () =>
        renderWithProviders(<Sut routes={routes} initialEntries={['/todos']} />)
      );

      const { getByText } = within(screen.getByTestId('location-display'));

      expect(getByText('/sign-in', { exact: true })).toBeInTheDocument();
    });

    afterEach(() => {
      mockServer.resetHandlers();
      storage.clear();
      cleanup();
    });
  });

  describe('SCENARIO - Mobile Screen', () => {
    beforeEach(() => {
      resizeScreenSize(768);
    });

    it('GIVEN user is in todos page WHEN there is cached session AND user clicks in log-out button THEN must redirect to home page', async () => {
      const userSimulator = userEvent.setup();

      const user = UserBuilder.user().build();

      mockServer.addUserToCollection(user);

      storage.set(Storage.KEYS.ACCESS_TOKEN, {
        accessToken: `access_token-id:${user.id}`,
      });

      const app = await act(async () =>
        renderWithProviders(<Sut routes={routes} initialEntries={['/todos']} />)
      );

      const dropdownButton = app.container
        .querySelector('header')!
        .querySelector('.header-mobile-dropdown-button')!;
      await userSimulator.click(dropdownButton);

      const logoutButton = app.container
        .querySelector('header')!
        .querySelector('#log-out-mobile')!;
      await userSimulator.click(logoutButton);

      const { getByText } = within(screen.getByTestId('location-display'));

      expect(getByText('/', { exact: true })).toBeInTheDocument();
    });

    afterEach(() => {
      storage.clear();
      cleanup();
    });
  });

  afterAll(() => mockServer.close());
});
