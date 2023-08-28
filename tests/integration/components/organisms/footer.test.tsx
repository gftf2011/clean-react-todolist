import '@testing-library/jest-dom';

import React from 'react';
import { describe, it, expect, afterEach } from 'vitest';

import { cleanup, render } from '@testing-library/react';

import { createMemoryRouter, RouterProvider } from 'react-router-dom';

import { Footer } from '@/presentation/components/organisms';

const Sut: React.FC<{ routes: any[] }> = ({ routes }) => {
  const router = createMemoryRouter(routes);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

describe('FEATURE - Footer Component', () => {
  it('GIVEN component is rendered THEN must display all social media icons', () => {
    const routes = [
      {
        path: '/',
        element: <Footer />,
      },
    ];
    const app = render(<Sut routes={routes} />);

    const [linkedInLink, githubLink, twitterLink, instagramLink] =
      app.container.querySelectorAll('a');

    expect(linkedInLink).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/gabriel-ferrari-tarallo-ferraz/'
    );
    expect(githubLink).toHaveAttribute('href', 'https://github.com/gftf2011');
    expect(twitterLink).toHaveAttribute(
      'href',
      'https://twitter.com/ogabrielferrari'
    );
    expect(instagramLink).toHaveAttribute(
      'href',
      'https://www.instagram.com/gabriel.tferrari/'
    );
  });

  afterEach(() => {
    cleanup();
  });
});
