import '@testing-library/jest-dom';

import React from 'react';
import { describe, it, afterEach, beforeEach, expect } from 'vitest';

import { cleanup, render, within, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  useLocation,
  createMemoryRouter,
  RouterProvider,
} from 'react-router-dom';

import { Storage } from '@/use-cases/ports/gateways';

import { LocalStorage } from '@/infra/gateways/local-storage';

import { makeHome } from '@/main/factories/presentation/pages';

import { resizeScreenSize } from '@/tests/utils';

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

const Sut: React.FC<{ routes: any[] }> = ({ routes }) => {
  const router = createMemoryRouter(routes);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

describe('FEATURE - Home Page', () => {
  const storage = LocalStorage.getInstance();

  const routes = [
    {
      path: '/',
      element: makeHome({}),
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

  describe('SCENARIO - Desktop Screen', () => {
    beforeEach(() => {
      resizeScreenSize(1200);
    });

    it('GIVEN user is in home page WHEN there is no cached session THEN must show main hero section', () => {
      const app = render(<Sut routes={routes} />);

      const h1 = app.container.querySelector('main')!.querySelector('h1');
      const h2 = app.container.querySelector('main')!.querySelector('h2');

      const { getByText: H1Text } = within(h1!);
      const { getByText: H2Text } = within(h2!);

      expect(
        H1Text('Organize your daily task in your phone !', { exact: true })
      ).toBeInTheDocument();
      expect(
        H2Text('Or organize it in your computer aswell !', { exact: true })
      ).toBeInTheDocument();
    });

    it('GIVEN user is in home page WHEN there is no cached session THEN must render header', () => {
      const app = render(<Sut routes={routes} />);
      const header = app.container.querySelector('header');
      expect(header).toBeInTheDocument();
    });

    it('GIVEN user is in home page WHEN there is no cached session THEN must render footer', () => {
      const app = render(<Sut routes={routes} />);
      const header = app.container.querySelector('footer');
      expect(header).toBeInTheDocument();
    });

    it('GIVEN user is in home page WHEN click in sign-in header button THEN must render sign-in page', async () => {
      const app = render(<Sut routes={routes} />);
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

    it('GIVEN user is in home page WHEN click in sign-up header button THEN must render sign-up page', async () => {
      const app = render(<Sut routes={routes} />);
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

    it('GIVEN user is in home page WHEN there is a cached session THEN must redirect to "/todos" page', () => {
      storage.set(Storage.KEYS.ACCESS_TOKEN, { accessToken: 'fake_session' });

      render(<Sut routes={routes} />);

      const { getByText } = within(screen.getByTestId('location-display'));

      expect(getByText('/todos', { exact: true })).toBeInTheDocument();
    });

    afterEach(() => {
      storage.clear();
      cleanup();
    });
  });

  describe('SCENARIO - Mobile Screen', () => {
    beforeEach(() => {
      resizeScreenSize(768);
    });

    it('GIVEN user is in home page WHEN click in sign-in header button THEN must render sign-in page', async () => {
      const app = render(<Sut routes={routes} />);
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

    it('GIVEN user is in home page WHEN click in sign-up header button THEN must render sign-up page', async () => {
      const app = render(<Sut routes={routes} />);
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
      storage.clear();
      cleanup();
    });
  });
});
