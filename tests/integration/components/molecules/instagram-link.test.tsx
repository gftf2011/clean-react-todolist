import '@testing-library/jest-dom';

import { describe, it, expect, afterEach } from 'vitest';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

import { cleanup, render } from '@testing-library/react';

import { InstagramLink } from '@/presentation/components/molecules';

const Sut: React.FC<{ routes: any[] }> = ({ routes }) => {
  const router = createMemoryRouter(routes);

  return <RouterProvider router={router} />;
};

describe('FEATURE - Instagram Link Component', () => {
  it('GIVEN link is shown THEN must have have property to redirect to instagram link', () => {
    const routes = [
      {
        path: '/',
        element: <InstagramLink />,
      },
    ];
    const app = render(<Sut routes={routes} />);

    const link = app.container.querySelector('a');

    expect(link).toHaveAttribute(
      'href',
      'https://www.instagram.com/gabriel.tferrari/'
    );
  });

  afterEach(() => {
    cleanup();
  });
});
