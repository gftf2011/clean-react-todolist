import '@testing-library/jest-dom';

import { describe, it, expect, afterEach } from 'vitest';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

import { cleanup, render } from '@testing-library/react';

import { LinkedInLink } from '@/presentation/components/molecules';

const Sut: React.FC<{ routes: any[] }> = ({ routes }) => {
  const router = createMemoryRouter(routes);

  return <RouterProvider router={router} />;
};

describe('FEATURE - LinkedIn Link Component', () => {
  it('GIVEN link is shown THEN must have have property to redirect to linkedIn link', () => {
    const routes = [
      {
        path: '/',
        element: <LinkedInLink />,
      },
    ];
    const app = render(<Sut routes={routes} />);

    const link = app.container.querySelector('a');

    expect(link).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/gabriel-ferrari-tarallo-ferraz/'
    );
  });

  afterEach(() => {
    cleanup();
  });
});
