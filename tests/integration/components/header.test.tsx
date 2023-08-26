import '@testing-library/jest-dom';
import React from 'react';
import { describe, it, expect, afterEach } from 'vitest';
import { cleanup, render, screen, within } from '@testing-library/react';

import {
  useLocation,
  createMemoryRouter,
  RouterProvider,
} from 'react-router-dom';

import { Header } from '@/presentation/components/organisms';

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
    describe('SCENARIO - Logged out', () => {
      it('GIVEN page is rendered THEN display path "/"', () => {
        render(<Sut />);
        const { getByText } = within(screen.getByTestId('location-display'));
        expect(getByText('/', { exact: true })).toBeInTheDocument();
      });

      afterEach(() => {
        cleanup();
      });
    });
  });
});
