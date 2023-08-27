import '@testing-library/jest-dom';

import { describe, it, expect, afterEach } from 'vitest';

import { cleanup, render, within } from '@testing-library/react';

import { LoadingScreen } from '@/presentation/components/molecules';

describe('FEATURE - Loading Screen Component', () => {
  it('GIVEN component is rendered THEN must show loading screen', () => {
    const app = render(<LoadingScreen />);

    const icon = app.container.querySelector('svg');
    const loadingText = app.container.querySelector('h1');

    const { getByText } = within(loadingText as HTMLElement);

    expect(icon).toBeInTheDocument();
    expect(getByText('Loading...', { exact: true })).toBeInTheDocument();
  });

  afterEach(() => {
    cleanup();
  });
});
