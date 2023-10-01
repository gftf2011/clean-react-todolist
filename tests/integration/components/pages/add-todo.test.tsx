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

import { makeAddTodo } from '@/main/factories/presentation/pages';

import { UserBuilder } from '@/tests/builders';
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
      path: '/todos',
      element: (
        <ElementWrapper>
          <></>
        </ElementWrapper>
      ),
    },
    {
      path: '/add-todo',
      element: makeAddTodo({}),
    },
  ];

  beforeAll(() => {
    mockServer.listen();
  });

  describe('SCENARIO - Desktop Screen', () => {
    beforeEach(() => {
      resizeScreenSize(1200);
    });

    it('GIVEN user is in "/add-todo" page WHEN page loads THEN must show form with elements AND empty inputs', async () => {
      const user = UserBuilder.user().build();

      mockServer.addUserToCollection(user);

      storage.set(Storage.KEYS.ACCESS_TOKEN, {
        accessToken: `access_token-id:${user.id}`,
      });

      const app = await act(async () =>
        renderWithProviders(
          <Sut routes={routes} initialEntries={['/add-todo']} />
        )
      );

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
        within(formTitle).getByText('Create Task', { exact: true })
      ).toBeInTheDocument();
      expect(titleInput.value).toBe('');
      expect(descriptionTextArea.value).toBe('');
      expect(
        within(submitButton).getByText('Save', { exact: true })
      ).toBeInTheDocument();
    });

    it('GIVEN user is in "/add-todo" page WHEN inputs are filled correctly AND submit button is pressed THEN must redirect to "/todos" page', async () => {
      const userSimulator = userEvent.setup();

      const user = UserBuilder.user().build();

      mockServer.addUserToCollection(user);

      storage.set(Storage.KEYS.ACCESS_TOKEN, {
        accessToken: `access_token-id:${user.id}`,
      });

      const app = await act(async () =>
        renderWithProviders(
          <Sut routes={routes} initialEntries={['/add-todo']} />
        )
      );

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

      const { getByText } = within(
        await screen.findByTestId('location-display')
      );

      expect(getByText('/todos', { exact: true })).toBeInTheDocument();
    });

    it('GIVEN user is in "/add-todo" page WHEN inputs are empty AND submit button is pressed THEN must show modal error', async () => {
      const userSimulator = userEvent.setup();

      const user = UserBuilder.user().build();

      mockServer.addUserToCollection(user);

      storage.set(Storage.KEYS.ACCESS_TOKEN, {
        accessToken: `access_token-id:${user.id}`,
      });

      const app = await act(async () =>
        renderWithProviders(
          <Sut routes={routes} initialEntries={['/add-todo']} />
        )
      );

      const submitButton: any = app.container
        .querySelector('form')!
        .querySelector('button[type="submit"]')!;

      await userSimulator.click(submitButton);

      const errorModal = await screen.findByText(
        'required field is missing, send informations again'
      )!;

      expect(errorModal).toBeInTheDocument();
    });

    it('GIVEN user is in "/add-todo" page WHEN inputs are empty AND submit button is pressed THEN must show modal error AND close it', async () => {
      const userSimulator = userEvent.setup();

      const user = UserBuilder.user().build();

      mockServer.addUserToCollection(user);

      storage.set(Storage.KEYS.ACCESS_TOKEN, {
        accessToken: `access_token-id:${user.id}`,
      });

      const app = await act(async () =>
        renderWithProviders(
          <Sut routes={routes} initialEntries={['/add-todo']} />
        )
      );

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
          'required field is missing, send informations again'
        )!;

      await expect(errorModal).rejects.toThrow();
    });

    it('GIVEN user is in "/add-todo" page WHEN there is no cached session THEN must redirect to "/sign-in" page', async () => {
      await act(async () =>
        renderWithProviders(
          <Sut routes={routes} initialEntries={['/add-todo']} />
        )
      );

      const { getByText } = within(screen.getByTestId('location-display'));

      expect(getByText('/sign-in', { exact: true })).toBeInTheDocument();
    });

    it('GIVEN user is in "/add-todo" page WHEN there is cached session AND user is not in database THEN must redirect to "/sign-in" page', async () => {
      const userSimulator = userEvent.setup();
      const users = [UserBuilder.user().build(), UserBuilder.user().build()];

      mockServer.addUserToCollection(users[0]);

      storage.set(Storage.KEYS.ACCESS_TOKEN, {
        accessToken: `access_token-id:${users[1].id}`,
      });

      const app = await act(async () =>
        renderWithProviders(
          <Sut routes={routes} initialEntries={['/add-todo']} />
        )
      );

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

    it('GIVEN user is in "/add-todo" page WHEN there is cached session AND user clicks in log-out button THEN must redirect to home page', async () => {
      const userSimulator = userEvent.setup();

      const user = UserBuilder.user().build();

      mockServer.addUserToCollection(user);

      storage.set(Storage.KEYS.ACCESS_TOKEN, {
        accessToken: `access_token-id:${user.id}`,
      });

      const app = await act(async () =>
        renderWithProviders(
          <Sut routes={routes} initialEntries={['/add-todo']} />
        )
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
