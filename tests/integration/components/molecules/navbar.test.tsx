import '@testing-library/jest-dom';

import { describe, it, expect, afterEach } from 'vitest';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

import { cleanup, render } from '@testing-library/react';

import { Navbar } from '@/presentation/components/molecules';

const Sut: React.FC<{ routes: any[] }> = ({ routes }) => {
  const router = createMemoryRouter(routes);

  return <RouterProvider router={router} />;
};

describe('FEATURE - Navbar Component', () => {
  it('GIVEN navbar is rendered THEN must show all list items', () => {
    const routes = [
      {
        path: '/',
        element: (
          <Navbar>
            <p>item1</p>
            <p>item2</p>
            <p>item3</p>
            <p>item4</p>
          </Navbar>
        ),
      },
    ];
    const app = render(<Sut routes={routes} />);

    const items = app.container.querySelectorAll('li');

    expect(items.length).toBe(4);
  });

  afterEach(() => {
    cleanup();
  });
});
