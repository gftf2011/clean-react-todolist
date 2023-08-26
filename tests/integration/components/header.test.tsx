import '@testing-library/jest-dom';

import React from 'react';
import { describe, it, expect, afterEach, beforeEach } from 'vitest';

import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  useLocation,
  createMemoryRouter,
  RouterProvider,
} from 'react-router-dom';

import { Header } from '@/presentation/components/organisms';

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

const routes = [
  {
    path: '/',
    element: (
      <ElementWrapper>
        <Header.Default />
      </ElementWrapper>
    ),
  },
  {
    path: '/sign-up',
    element: (
      <ElementWrapper>
        <Header.Default />
      </ElementWrapper>
    ),
  },
  {
    path: '/sign-in',
    element: (
      <ElementWrapper>
        <Header.Default />
      </ElementWrapper>
    ),
  },
];

const Sut: React.FC = () => {
  const router = createMemoryRouter(routes);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

describe('FEATURE - Header Component', () => {
  describe('BACKGROUND - Desktop Screen', () => {
    beforeEach(() => {
      resizeScreenSize(1200);
    });

    describe('SCENARIO - Logged out', () => {
      it('GIVEN page is rendered THEN display path "/"', () => {
        render(<Sut />);
        const { getByText } = within(screen.getByTestId('location-display'));
        expect(getByText('/', { exact: true })).toBeInTheDocument();
      });

      it('GIVEN page is rendered WHEN user click in sign-in link THEN redirect to "/sign-in"', async () => {
        const app = render(<Sut />);

        const listItems = app.container
          .querySelector('#header-desktop-navigation')
          ?.querySelector('ul')
          ?.querySelectorAll('li') as unknown as any[];

        const signInLink = listItems[1].querySelector('a');

        const user = userEvent.setup();

        await user.click(signInLink as HTMLElement);

        const { getByText } = within(screen.getByTestId('location-display'));

        expect(getByText('/sign-in', { exact: true })).toBeInTheDocument();
      });

      it('GIVEN page is rendered WHEN user click in sign-up link THEN redirect to "/sign-up"', async () => {
        const app = render(<Sut />);

        const listItems = app.container
          .querySelector('#header-desktop-navigation')
          ?.querySelector('ul')
          ?.querySelectorAll('li') as unknown as any[];

        const signUpLink = listItems[2].querySelector('a');

        const user = userEvent.setup();

        await user.click(signUpLink as HTMLElement);

        const { getByText } = within(screen.getByTestId('location-display'));

        expect(getByText('/sign-up', { exact: true })).toBeInTheDocument();
      });

      afterEach(() => {
        cleanup();
      });
    });
  });

  describe('BACKGROUND - Mobile Screen', () => {
    beforeEach(() => {
      resizeScreenSize(768);
    });

    describe('SCENARIO - Logged out', () => {
      it('GIVEN page is rendered THEN display path "/"', () => {
        render(<Sut />);
        const { getByText } = within(screen.getByTestId('location-display'));
        expect(getByText('/', { exact: true })).toBeInTheDocument();
      });

      it('GIVEN page is rendered AND drop down button was not pressed THEN must not display mobile navigation item', () => {
        const app = render(<Sut />);

        const dropdownNavigation = app.container.querySelector(
          '#header-mobile-navigation'
        );

        expect(dropdownNavigation).not.toBeInTheDocument();
      });

      it('GIVEN page is rendered AND drop down button was pressed THEN must display mobile navigation item', async () => {
        const app = render(<Sut />);
        const user = userEvent.setup();

        const dropdownButton = app.container.querySelector(
          '.header-mobile-dropdown-button'
        );

        await user.click(dropdownButton as HTMLElement);

        const dropdownNavigation = app.container.querySelector(
          '#header-mobile-navigation'
        );

        expect(dropdownNavigation).toBeInTheDocument();
      });

      it('GIVEN page is rendered WHEN drop down button was pressed AND user click in sign-in link THEN redirect to "/sign-in"', async () => {
        const app = render(<Sut />);
        const user = userEvent.setup();

        const dropdownButton = app.container.querySelector(
          '.header-mobile-dropdown-button'
        );

        await user.click(dropdownButton as HTMLElement);

        const listItems = app.container
          .querySelector('#header-mobile-navigation')
          ?.querySelector('ul')
          ?.querySelectorAll('li') as unknown as any[];
        const signInLink = listItems[1].querySelector('a');

        await user.click(signInLink as HTMLElement);

        const { getByText } = within(screen.getByTestId('location-display'));

        expect(getByText('/sign-in', { exact: true })).toBeInTheDocument();
      });

      it('GIVEN page is rendered WHEN drop down button was pressed AND user click in sign-up link THEN redirect to "/sign-up"', async () => {
        const app = render(<Sut />);
        const user = userEvent.setup();

        const dropdownButton = app.container.querySelector(
          '.header-mobile-dropdown-button'
        );

        await user.click(dropdownButton as HTMLElement);

        const listItems = app.container
          .querySelector('#header-mobile-navigation')
          ?.querySelector('ul')
          ?.querySelectorAll('li') as unknown as any[];
        const signUpLink = listItems[2].querySelector('a');

        await user.click(signUpLink as HTMLElement);

        const { getByText } = within(screen.getByTestId('location-display'));

        expect(getByText('/sign-up', { exact: true })).toBeInTheDocument();
      });

      afterEach(() => {
        cleanup();
      });
    });
  });
});
