import '@testing-library/jest-dom';

import { describe, it, expect, afterEach } from 'vitest';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

import { cleanup, render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Toast } from '@/presentation/components/molecules';

const Sut: React.FC<{ routes: any[] }> = ({ routes }) => {
  const router = createMemoryRouter(routes);

  return <RouterProvider router={router} />;
};

describe('FEATURE - Toast Component', () => {
  it('GIVEN toast is rendered THEN must show toast text', () => {
    const routes = [
      {
        path: '/',
        element: <Toast text="toast message" onClick={(_e: any) => {}} />,
      },
    ];
    const app = render(<Sut routes={routes} />);

    const toastMessage = app.container.querySelector('p');

    const { getByText } = within(toastMessage as HTMLElement);

    expect(getByText('toast message', { exact: true })).toBeInTheDocument();
  });

  it('GIVEN toast is rendered AND button is clicked THEN must fire action', async () => {
    let counter = 0;
    const routes = [
      {
        path: '/',
        element: (
          <Toast
            text="..."
            onClick={(_e: any) => {
              counter++;
            }}
          />
        ),
      },
    ];
    const app = render(<Sut routes={routes} />);
    const user = userEvent.setup();

    const button = app.container.querySelector('button');

    await user.click(button as HTMLElement);

    expect(counter).toBe(1);
  });

  afterEach(() => {
    cleanup();
  });
});
