import '@testing-library/jest-dom';

import React from 'react';
import {
  describe,
  it,
  expect,
  afterEach,
  beforeEach,
  beforeAll,
  afterAll,
} from 'vitest';

import {
  act,
  cleanup,
  within,
  screen,
  fireEvent,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  useLocation,
  createMemoryRouter,
  RouterProvider,
} from 'react-router-dom';

import { Storage } from '@/use-cases/ports/gateways';

import { LocalStorage } from '@/infra/gateways/local-storage';

import { makeEditTodo, makeTodos } from '@/main/factories/presentation/pages';

import { UserBuilder, NoteBuilder } from '@/tests/builders';
import {
  resizeScreenSize,
  renderWithProviders,
  MockServer,
} from '@/tests/utils';

type Props = {
  children: any;
};

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

describe('FEATURE - Edit Todo Page', () => {
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
      path: '/todos',
      element: makeTodos({}),
    },
    {
      path: '/edit-todo/:id',
      element: makeEditTodo({}),
    },
  ];

  beforeAll(() => {
    mockServer.listen();
  });

  describe('SCENARIO - Desktop Screen', () => {
    beforeEach(() => {
      resizeScreenSize(1200);
    });

    it('GIVEN user is in "/todos" page AND goes to "/edit-todo/:id" WHEN page loads THEN must show form with elements AND filled inputs', async () => {
      const userSimulator = userEvent.setup();

      const user = UserBuilder.user().build();
      const note = NoteBuilder.note().build();

      mockServer.addUserToCollection(user);
      mockServer.addNoteToCollection(note, user.id);

      storage.set(Storage.KEYS.ACCESS_TOKEN, {
        accessToken: `access_token-id:${user.id}`,
      });

      const app = await act(async () =>
        renderWithProviders(<Sut routes={routes} initialEntries={[`/todos`]} />)
      );

      const todoCardEditLink = (
        await screen.findByTestId(`${note.id}-todo-card-wrap`)!
      ).querySelector('div')!;

      await userSimulator.click(todoCardEditLink);

      const formTitle: any = app.container
        .querySelector('form')!
        .querySelector('h1')!;

      const titleInput: any = app.container
        .querySelector('form')!
        .querySelector('input')!;

      const descriptionTextArea: any = app.container
        .querySelector('form')!
        .querySelector('textarea')!;

      const submitButton: any = app.container
        .querySelector('form')!
        .querySelector('button[type="submit"]')!;

      expect(
        within(formTitle).getByText('Edit Task', { exact: true })
      ).toBeInTheDocument();
      expect(titleInput.value).toBe(note.title);
      expect(descriptionTextArea.value).toBe(note.description);
      expect(
        within(submitButton).getByText('Edit', { exact: true })
      ).toBeInTheDocument();
    });

    it('GIVEN user is in "/todos" page AND goes to "/edit-todo/:id" WHEN inputs are filled correctly AND submit button is pressed THEN must redirect to "/todos" page AND todo card must show new title and description', async () => {
      const userSimulator = userEvent.setup();

      const user = UserBuilder.user().build();
      const note = NoteBuilder.note().build();

      mockServer.addUserToCollection(user);
      mockServer.addNoteToCollection(note, user.id);

      storage.set(Storage.KEYS.ACCESS_TOKEN, {
        accessToken: `access_token-id:${user.id}`,
      });

      const app = await act(async () =>
        renderWithProviders(<Sut routes={routes} initialEntries={[`/todos`]} />)
      );

      const todoCardEditLink = (
        await screen.findByTestId(`${note.id}-todo-card-wrap`)!
      ).querySelector('div')!;

      await userSimulator.click(todoCardEditLink);

      const titleInput: any = app.container
        .querySelector('form')!
        .querySelector('input')!;

      const descriptionTextArea: any = app.container
        .querySelector('form')!
        .querySelector('textarea')!;

      fireEvent.change(titleInput, { target: { value: 'Test' } });
      fireEvent.change(descriptionTextArea, { target: { value: 'Test' } });

      const submitButton: any = app.container
        .querySelector('form')!
        .querySelector('button[type="submit"]')!;

      await userSimulator.click(submitButton);

      const todoCardTitle = (
        await screen.findByTestId(`${note.id}-todo-card-wrap`)!
      )
        .querySelector('div')!
        .querySelector('h3')!;

      const todoCardDescription = (
        await screen.findByTestId(`${note.id}-todo-card-wrap`)!
      )
        .querySelector('div')!
        .querySelector('small')!;

      expect(
        within(todoCardTitle).getByText('Test', { exact: true })
      ).toBeInTheDocument();
      expect(
        within(todoCardDescription).getByText('Test', { exact: true })
      ).toBeInTheDocument();
    });

    it('GIVEN user is in "/todos" page AND goes to "/edit-todo/:id" WHEN inputs are filled incorrectly AND submit button is pressed THEN must show popup error', async () => {
      const userSimulator = userEvent.setup();

      const user = UserBuilder.user().build();
      const note = NoteBuilder.note().build();

      mockServer.addUserToCollection(user);
      mockServer.addNoteToCollection(note, user.id);

      storage.set(Storage.KEYS.ACCESS_TOKEN, {
        accessToken: `access_token-id:${user.id}`,
      });

      const app = await act(async () =>
        renderWithProviders(<Sut routes={routes} initialEntries={[`/todos`]} />)
      );

      const todoCardEditLink = (
        await screen.findByTestId(`${note.id}-todo-card-wrap`)!
      ).querySelector('div')!;

      await userSimulator.click(todoCardEditLink);

      const titleInput: any = app.container
        .querySelector('form')!
        .querySelector('input')!;

      const descriptionTextArea: any = app.container
        .querySelector('form')!
        .querySelector('textarea')!;

      fireEvent.change(titleInput, { target: { value: '' } });
      fireEvent.change(descriptionTextArea, { target: { value: '' } });

      const submitButton: any = app.container
        .querySelector('form')!
        .querySelector('button[type="submit"]')!;

      await userSimulator.click(submitButton);

      const errorModal = await screen.findByText(
        'please, check if note information are correct or if note exists'
      )!;

      expect(errorModal).toBeInTheDocument();
    });

    it('GIVEN user is in "/todos" page AND goes to "/edit-todo/:id" WHEN inputs are filled incorrectly AND submit button is pressed THEN must show popup error AND close it', async () => {
      const userSimulator = userEvent.setup();

      const user = UserBuilder.user().build();
      const note = NoteBuilder.note().build();

      mockServer.addUserToCollection(user);
      mockServer.addNoteToCollection(note, user.id);

      storage.set(Storage.KEYS.ACCESS_TOKEN, {
        accessToken: `access_token-id:${user.id}`,
      });

      const app = await act(async () =>
        renderWithProviders(<Sut routes={routes} initialEntries={[`/todos`]} />)
      );

      const todoCardEditLink = (
        await screen.findByTestId(`${note.id}-todo-card-wrap`)!
      ).querySelector('div')!;

      await userSimulator.click(todoCardEditLink);

      const titleInput: any = app.container
        .querySelector('form')!
        .querySelector('input')!;

      const descriptionTextArea: any = app.container
        .querySelector('form')!
        .querySelector('textarea')!;

      fireEvent.change(titleInput, { target: { value: '' } });
      fireEvent.change(descriptionTextArea, { target: { value: '' } });

      const submitButton: any = app.container
        .querySelector('form')!
        .querySelector('button[type="submit"]')!;

      await userSimulator.click(submitButton);

      const toastCloseButton = app.container
        .querySelector('main > div')!
        .querySelector('button')!;

      await userSimulator.click(toastCloseButton);

      const errorModal = async () =>
        screen.findByText(
          'please, check if note information are correct or if note exists'
        )!;

      await expect(errorModal).rejects.toThrow();
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

    it('GIVEN user is in "/add-todo" page AND goes to "/edit-todo/:id" page WHEN there is cached session AND user clicks in log-out button THEN must redirect to home page', async () => {
      const userSimulator = userEvent.setup();

      const user = UserBuilder.user().build();
      const note = NoteBuilder.note().build();

      mockServer.addUserToCollection(user);
      mockServer.addNoteToCollection(note, user.id);

      storage.set(Storage.KEYS.ACCESS_TOKEN, {
        accessToken: `access_token-id:${user.id}`,
      });

      const app = await act(async () =>
        renderWithProviders(<Sut routes={routes} initialEntries={[`/todos`]} />)
      );

      const todoCardEditLink = (
        await screen.findByTestId(`${note.id}-todo-card-wrap`)!
      ).querySelector('div')!;

      await userSimulator.click(todoCardEditLink);

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
