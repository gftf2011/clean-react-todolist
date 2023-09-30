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
  act,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  useLocation,
  createMemoryRouter,
  RouterProvider,
} from 'react-router-dom';

import { LocalStorage } from '@/infra/gateways/local-storage';

import { makeSignUp } from '@/main/factories/presentation/pages';

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
      path: '/sign-up',
      element: makeSignUp({}),
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
  ];

  beforeAll(() => {
    mockServer.listen();
  });

  describe('SCENARIO - Desktop Screen', () => {
    beforeEach(() => {
      resizeScreenSize(1200);
    });

    it('GIVEN user is in sign-up page WHEN there is no cached session THEN must show form', async () => {
      const app = await act(async () =>
        render(<Sut routes={routes} initialEntries={['/sign-up']} />)
      );

      const form = app.container.querySelector('form')!;

      expect(form).toBeInTheDocument();
    });

    it('GIVEN user is in sign-up page WHEN click in home header button THEN must render home page', async () => {
      const app = await act(async () =>
        render(<Sut routes={routes} initialEntries={['/sign-up']} />)
      );
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

    it('GIVEN user is in sign-up page WHEN click in sign-in header button THEN must render sign-in page', async () => {
      const app = await act(async () =>
        render(<Sut routes={routes} initialEntries={['/sign-up']} />)
      );
      const user = userEvent.setup();

      const signInLink = app.container
        .querySelector('#header-desktop-navigation')!
        .querySelector('ul')!
        .querySelectorAll('li')![1]
        .querySelector('a')!;

      await user.click(signInLink);

      const { getByText } = within(screen.getByTestId('location-display'));

      expect(getByText('/sign-in', { exact: true })).toBeInTheDocument();
    });

    it('GIVEN user is in sign-up page WHEN presses the submit button AND no field was filled THEN must show inputs error messages', async () => {
      const app = await act(async () =>
        render(<Sut routes={routes} initialEntries={['/sign-up']} />)
      );
      const user = userEvent.setup();

      const submitButton = app.container
        .querySelector('form')!
        .querySelector('button')!;

      await user.click(submitButton);

      const inputMessageErrors = app.container
        .querySelector('form')!
        .querySelectorAll('span')!;

      const { getByText: getNameErrorMessage } = within(inputMessageErrors[0]);
      const { getByText: getLastameErrorMessage } = within(
        inputMessageErrors[1]
      );
      const { getByText: getEmailErrorMessage } = within(inputMessageErrors[2]);
      const { getByText: getPasswordErrorMessage } = within(
        inputMessageErrors[3]
      );

      expect(
        getNameErrorMessage('required field', { exact: true })
      ).toBeInTheDocument();
      expect(
        getLastameErrorMessage('required field', { exact: true })
      ).toBeInTheDocument();
      expect(
        getEmailErrorMessage('required field', { exact: true })
      ).toBeInTheDocument();
      expect(
        getPasswordErrorMessage('required field', { exact: true })
      ).toBeInTheDocument();
    });

    it('GIVEN user is in sign-up page WHEN presses the submit button AND no field was filled THEN must show toast error', async () => {
      const app = await act(async () =>
        render(<Sut routes={routes} initialEntries={['/sign-up']} />)
      );
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

    it('GIVEN user is in sign-up page WHEN presses the submit button AND no field was filled THEN must show toast error AND close toast', async () => {
      const app = await act(async () =>
        render(<Sut routes={routes} initialEntries={['/sign-up']} />)
      );
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

    it('GIVEN user is in sign-up page WHEN presses the submit button AND all fields were filled THEN must redirect to "/todos" page', async () => {
      const app = await act(async () =>
        render(<Sut routes={routes} initialEntries={['/sign-up']} />)
      );
      const user = userEvent.setup();

      const inputs = app.container
        .querySelector('main')!
        .querySelectorAll('input')!;

      fireEvent.change(inputs[0], { target: { value: 'Test' } });
      fireEvent.change(inputs[1], { target: { value: 'Test' } });
      fireEvent.change(inputs[2], { target: { value: 'test@mail.com' } });
      fireEvent.change(inputs[3], { target: { value: '12345678aA@' } });

      const submitButton = app.container
        .querySelector('form')!
        .querySelector('button')!;

      await user.click(submitButton);

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

    it('GIVEN user is in sign-up page WHEN click in home header button THEN must render home page', async () => {
      const app = await act(async () =>
        render(<Sut routes={routes} initialEntries={['/sign-up']} />)
      );
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

    it('GIVEN user is in sign-up page WHEN click in sign-in header button THEN must render sign-in page', async () => {
      const app = await act(async () =>
        render(<Sut routes={routes} initialEntries={['/sign-up']} />)
      );
      const user = userEvent.setup();

      const dropdownButton = app.container.querySelector(
        '.header-mobile-dropdown-button'
      )!;

      await user.click(dropdownButton);

      const signInLink = app.container
        .querySelector('#header-mobile-navigation')!
        .querySelector('ul')!
        .querySelectorAll('li')![1]
        .querySelector('a')!;

      await user.click(signInLink);

      const { getByText } = within(screen.getByTestId('location-display'));

      expect(getByText('/sign-in', { exact: true })).toBeInTheDocument();
    });

    afterEach(() => {
      mockServer.resetHandlers();
      storage.clear();
      cleanup();
    });
  });

  afterAll(() => mockServer.close());
});
