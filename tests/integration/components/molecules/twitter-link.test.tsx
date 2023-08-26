import '@testing-library/jest-dom';

import { describe, it, expect, afterEach } from 'vitest';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

import { cleanup, render } from '@testing-library/react';

import { TwitterLink } from '@/presentation/components/molecules';

const Sut: React.FC<{ routes: any[] }> = ({ routes }) => {
  const router = createMemoryRouter(routes);

  return <RouterProvider router={router} />;
};

describe('FEATURE - Twitter Link Component', () => {
  it('GIVEN link is shown THEN must have have property to redirect to Twitter link', () => {
    const routes = [
      {
        path: '/',
        element: <TwitterLink />,
      },
    ];
    const app = render(<Sut routes={routes} />);

    const link = app.container.querySelector('a');

    expect(link).toHaveAttribute('href', 'https://twitter.com/ogabrielferrari');
  });

  afterEach(() => {
    cleanup();
  });
});
