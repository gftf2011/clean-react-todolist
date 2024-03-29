import '@testing-library/jest-dom';

import { describe, it, expect, afterEach } from 'vitest';

import { cleanup, render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Toast } from '@/presentation/components/molecules';

describe('FEATURE - Toast Component', () => {
  it('GIVEN toast is rendered THEN must show toast text', () => {
    const app = render(
      <Toast text="toast message" onClick={(_e: any) => {}} />
    );

    const toastMessage = app.container.querySelector('p');

    const { getByText } = within(toastMessage as HTMLElement);

    expect(getByText('toast message', { exact: true })).toBeInTheDocument();
  });

  it('GIVEN toast is rendered AND button is clicked THEN must fire action', async () => {
    let counter = 0;

    const app = render(
      <Toast
        text="..."
        onClick={(_e: any) => {
          counter++;
        }}
      />
    );
    const user = userEvent.setup();

    const button = app.container.querySelector('button');

    await user.click(button as HTMLElement);

    expect(counter).toBe(1);
  });

  afterEach(() => {
    cleanup();
  });
});
