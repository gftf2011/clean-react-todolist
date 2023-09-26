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
  cleanup,
  render,
  within,
  fireEvent,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  useLocation,
  createMemoryRouter,
  RouterProvider,
} from 'react-router-dom';

import { LocalStorage } from '@/infra/gateways/local-storage';

import { makeSignIn } from '@/main/factories/presentation/pages';

import { UserBuilder } from '@/tests/builders';
import { resizeScreenSize, MockServer } from '@/tests/utils';

type Props = {
  children: any;
};

const ElementWrapper: React.FC<Props> = ({ children }) => {
  const location = useLocation();

  return (
    <>
      {children}
      <div data-testid="location-display">{location.pathname}</div>
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

describe('FEATURE - Sign Up Page', () => {
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
      element: makeSignIn({}),
    },
    {
      path: '/sign-up',
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
  ];

  beforeAll(() => {
    mockServer.listen();
  });

  describe('SCENARIO - Desktop Screen', () => {
    beforeEach(() => {
      resizeScreenSize(1200);
    });

    it('GIVEN user is in sign-in page WHEN there is no cached session THEN must show form', () => {
      const app = render(<Sut routes={routes} initialEntries={['/sign-in']} />);

      const form = app.container.querySelector('form')!;

      expect(form).toBeInTheDocument();
    });

    it('GIVEN user is in sign-in page WHEN click in home header button THEN must render home page', async () => {
      const app = render(<Sut routes={routes} initialEntries={['/sign-in']} />);
      const user = userEvent.setup();

      const homeLink = app.container
        .querySelector('#header-desktop-navigation')!
        .querySelector('ul')!
        .querySelectorAll('li')![0]
        .querySelector('a')!;

      await user.click(homeLink);

      const { getByText } = within(screen.getByTestId('location-display'));

      expect(getByText('/', { exact: true })).toBeInTheDocument();
    });

    it('GIVEN user is in sign-in page WHEN click in sign-up header button THEN must render sign-up page', async () => {
      const app = render(<Sut routes={routes} initialEntries={['/sign-in']} />);
      const user = userEvent.setup();

      const signUpLink = app.container
        .querySelector('#header-desktop-navigation')!
        .querySelector('ul')!
        .querySelectorAll('li')![2]
        .querySelector('a')!;

      await user.click(signUpLink);

      const { getByText } = within(screen.getByTestId('location-display'));

      expect(getByText('/sign-up', { exact: true })).toBeInTheDocument();
    });

    it('GIVEN user is in sign-in page WHEN presses the submit button AND no field was filled THEN must show inputs error messages', async () => {
      const app = render(<Sut routes={routes} initialEntries={['/sign-in']} />);
      const user = userEvent.setup();

      const submitButton = app.container
        .querySelector('form')!
        .querySelector('button')!;

      await user.click(submitButton);

      const inputMessageErrors = app.container
        .querySelector('form')!
        .querySelectorAll('span')!;

      const { getByText: getEmailErrorMessage } = within(inputMessageErrors[0]);
      const { getByText: getPasswordErrorMessage } = within(
        inputMessageErrors[1]
      );

      expect(
        getEmailErrorMessage('required field', { exact: true })
      ).toBeInTheDocument();
      expect(
        getPasswordErrorMessage('required field', { exact: true })
      ).toBeInTheDocument();
    });

    it('GIVEN user is in sign-in page WHEN presses the submit button AND no field was filled AND no user exists in database THEN must show toast error', async () => {
      const app = render(<Sut routes={routes} initialEntries={['/sign-in']} />);
      const user = userEvent.setup();

      const submitButton = app.container
        .querySelector('form')!
        .querySelector('button')!;

      await user.click(submitButton);

      const toastMessage = app.container
        .querySelector('main > div')!
        .querySelector('div')!
        .querySelector('p')!;

      const { getByText } = within(toastMessage);

      expect(
        getByText('credentials are not valid', { exact: true })
      ).toBeInTheDocument();
    });

    it('GIVEN user is in sign-in page WHEN presses the submit button AND no field was filled THEN must show toast error AND close toast', async () => {
      const app = render(<Sut routes={routes} initialEntries={['/sign-in']} />);
      const user = userEvent.setup();

      const submitButton = app.container
        .querySelector('form')!
        .querySelector('button')!;

      await user.click(submitButton);

      const toastCloseButton = app.container
        .querySelector('main > div')!
        .querySelector('button')!;

      await user.click(toastCloseButton);

      const toast = screen.queryByText('credentials are not valid');

      expect(toast).not.toBeInTheDocument();
    });

    it('GIVEN user is in sign-in page WHEN presses the submit button AND all fields were filled THEN must redirect to "/todos" page', async () => {
      const user = UserBuilder.user()
        .withCustomEmail('test@mail.com')
        .withCustomPassword('12345678aA@')
        .build();

      mockServer.addUserToCollection(user);

      const app = render(<Sut routes={routes} initialEntries={['/sign-in']} />);
      const userSimulator = userEvent.setup();

      const inputs = app.container
        .querySelector('main')!
        .querySelectorAll('input')!;

      fireEvent.change(inputs[0], { target: { value: user.email } });
      fireEvent.change(inputs[1], { target: { value: user.password } });

      const submitButton = app.container
        .querySelector('form')!
        .querySelector('button')!;

      await userSimulator.click(submitButton);

      const { getByText } = within(screen.getByTestId('location-display'));

      expect(getByText('/todos', { exact: true })).toBeInTheDocument();
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

    it('GIVEN user is in sign-in page WHEN click in home header button THEN must render home page', async () => {
      const app = render(<Sut routes={routes} initialEntries={['/sign-in']} />);
      const user = userEvent.setup();

      const dropdownButton = app.container.querySelector(
        '.header-mobile-dropdown-button'
      )!;

      await user.click(dropdownButton);

      const homeLink = app.container
        .querySelector('#header-mobile-navigation')!
        .querySelector('ul')!
        .querySelectorAll('li')![0]
        .querySelector('a')!;

      await user.click(homeLink);

      const { getByText } = within(screen.getByTestId('location-display'));

      expect(getByText('/', { exact: true })).toBeInTheDocument();
    });

    it('GIVEN user is in sign-in page WHEN click in sign-up header button THEN must render sign-up page', async () => {
      const app = render(<Sut routes={routes} initialEntries={['/sign-in']} />);
      const user = userEvent.setup();

      const dropdownButton = app.container.querySelector(
        '.header-mobile-dropdown-button'
      )!;

      await user.click(dropdownButton);

      const signUpLink = app.container
        .querySelector('#header-mobile-navigation')!
        .querySelector('ul')!
        .querySelectorAll('li')![2]
        .querySelector('a')!;

      await user.click(signUpLink);

      const { getByText } = within(screen.getByTestId('location-display'));

      expect(getByText('/sign-up', { exact: true })).toBeInTheDocument();
    });

    afterEach(() => {
      mockServer.resetHandlers();
      storage.clear();
      cleanup();
    });
  });

  afterAll(() => mockServer.close());
});
