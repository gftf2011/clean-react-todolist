import '@testing-library/jest-dom';

import { rest } from 'msw';
import { setupServer } from 'msw/node';

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

import { cleanup, render } from '@testing-library/react';

import {
  useLocation,
  createMemoryRouter,
  RouterProvider,
} from 'react-router-dom';

// import { Storage } from '@/use-cases/ports/gateways';

import { LocalStorage } from '@/infra/gateways/local-storage';

import { makeSignUp } from '@/main/factories/presentation/pages';

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

const server = setupServer(
  rest.post(
    `${import.meta.env.VITE_BASE_URL}/api/V1/sign-up`,
    async (req, res, ctx) => {
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

      return res(
        ctx.status(201),
        ctx.json({
          statusCode: 201,
          body: { accessToken: `access_token` },
        })
      );
    }
  )
);

describe('FEATURE - Sign Up Page', () => {
  const storage = LocalStorage.getInstance();

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
  ];

  beforeAll(() => server.listen());

  describe('SCENARIO - Desktop Screen', () => {
    beforeEach(() => {
      resizeScreenSize(1200);
    });

    it('GIVEN user is in sign-up page WHEN there is no cached session THEN must show form', () => {
      const app = render(<Sut routes={routes} initialEntries={['/sign-up']} />);

      const form = app.container.querySelector('form')!;

      expect(form).toBeInTheDocument();
    });

    it('...', () => {
      // const app = render(<Sut routes={routes} initialEntries={['/sign-up']} />);
      // const form = app.container.querySelector('form')!;
      // expect(form).toBeInTheDocument();
    });

    afterEach(() => {
      server.resetHandlers();
      storage.clear();
      cleanup();
    });
  });

  afterAll(() => server.close());
});
