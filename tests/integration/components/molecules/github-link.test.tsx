import '@testing-library/jest-dom';

import { describe, it, expect, afterEach } from 'vitest';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

import { cleanup, render } from '@testing-library/react';

import { GithubLink } from '@/presentation/components/molecules';

const Sut: React.FC<{ routes: any[] }> = ({ routes }) => {
  const router = createMemoryRouter(routes);

  return <RouterProvider router={router} />;
};

describe('FEATURE - Github Link Component', () => {
  it('GIVEN link is shown THEN must have have property to redirect to github link', () => {
    const routes = [
      {
        path: '/',
        element: <GithubLink />,
      },
    ];
    const app = render(<Sut routes={routes} />);

    const link = app.container.querySelector('a');

    expect(link).toHaveAttribute('href', 'https://github.com/gftf2011');
  });

  afterEach(() => {
    cleanup();
  });
});
